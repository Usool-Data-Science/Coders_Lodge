from app import app, db
from models import Friend
from flask import request, jsonify, abort

# GET Request
@app.route('/api/friends', methods=["GET"], strict_slashes=False)
def get_all_friends():
    """Returns all friends"""
    friends = Friend.query.all()
    response = [friend.to_json() for friend in friends]
    
    return jsonify(response)

@app.route('/api/friends', methods=["POST"], strict_slashes=False)
def create_friend():
    # Validations
    if request.content_type != 'application/json':
        return abort(400, 'Not a JSON')
    
    details = request.get_json()
    if not details:
        return abort(400, 'Empty JSON received')
    
    required_fields = ["name","role","description","gender"]
    for field in required_fields:
      if field not in details or not details.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400
      
    gender = details["gender"]
    name = details["name"]
    # Fetch avatar image based on gender
    if gender == "male":
      details['img_url'] = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif gender == "female":
      details['img_url'] = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
      details['img_url'] = None
    try:
      new_friend = Friend(**details)
      db.session.add(new_friend)
      db.session.commit()

    except Exception as e:
       db.session.roll_back()
       return jsonify({'Error': str(e)}), 500
    
    return jsonify(new_friend.to_json()), 201

@app.route('/api/friends/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_friend(id):
    """Delete a friend from the database"""
    try:
       friend = Friend.query.get(id)
       if not friend:
          return jsonify({"Error": "Friend not found"}), 404
       db.session.delete(friend)
       db.session.commit()

       return jsonify({"msg": f"Friend with id {id} Deleted successfully"}), 200
    except Exception as e:
       return jsonify({"Error": str(e)}), 500
    
@app.route('/api/friends/<int:id>', methods=['PUT'], strict_slashes=False)
def update_friend(id):
    if not request or request.content_type != 'application/json':
       return abort(404, "Not a JSON")
    details = request.get_json()

    friend = Friend.query.get(id)

    if not friend:
       return abort(404, 'Friend not found')
    try:
      friend.name = details.get("name",friend.name)
      friend.role = details.get("role",friend.role)
      friend.description = details.get("description",friend.description)
      friend.gender = details.get("gender",friend.gender)

      db.session.commit()
      return jsonify(friend.to_json()),200
    except Exception as e:
      db.session.rollback()
      return jsonify({"error":str(e)}),500
      

