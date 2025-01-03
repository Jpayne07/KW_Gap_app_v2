#!/usr/bin/env python3
from flask import  request,  session
from flask_restful import Resource
from flask import Flask, make_response, jsonify, request
from sqlalchemy import desc
from werkzeug.exceptions import UnprocessableEntity, Unauthorized
from werkzeug.utils import secure_filename
import os
import csv
from flask_migrate import Migrate
from config import app, db, api
# Add your model imports
from models import User, Project, ProjectCollaborators
from flask import send_from_directory

# Views go here!

class Home(Resource):
    def get(self):
        return "Hello, please navigate to a route with some data for more info. Included: /projects, /users /project_collaborators"
    
###

###

#BEGIN USER VIEWS

###

###
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(users, 200)
        return response
    
    def post(self):
        try:
            data = request.get_json()
            if not data.get('username'):
                raise UnprocessableEntity(description="Username is required")
            # if not data.get('password'):
            #     raise UnprocessableEntity(description="Username is required")
            new_user = User(
                username = data['username'],
                name = data['name'],
            )
            # new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()
            return (new_user.to_dict(), 200)
        except ValueError as e:
            response = make_response({"errors": ['validation errors']}, 400)
            return response
class UserItem(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        response = make_response(user.to_dict(), 200)
        return response
###

###

#BEGIN PROJECT VIEWS

###

###

class Projects(Resource):
    def get(self):
        projects = [project.to_dict() for project in Project.query.all()]
        print(projects)
        #THE BELOW LOGIC HANDLES IAM FUNCTIONALITY
        # project_list = []
        # for project in projects:
        #     if session['user_id']:
        #         if any(collaborator['user_id'] == session['user_id'] for collaborator in project['collaborators']):
        #             project_list.append(project)
        response = make_response(projects, 200)
        return response
    
    def post(self):
        data = request.get_json()
        new_project = Project(
            logo = data['logo'],
            brand_name = data['brand_name']
        )
    #     owner_collaborator = ProjectCollaborators(
    #         user_id=session.get('user_id'),
    #         role='owner'
    #         )   

    # # Append the collaborator to the project's collaborators list
    #     new_project.collaborators.append(owner_collaborator)
        db.session.add(new_project)
        db.session.commit()
        project_in_db = Project.query.order_by(desc(Project.id)).first()
        response = make_response(project_in_db.to_dict(), 201)
        return response
    

class ProjectItem(Resource):
    def get(self, id):
        project = Project.query.filter_by(id=id).first()
        response = make_response(project.to_dict(), 200)
        return response

###

###

#BEGIN COLLABORATOR VIEWS

###

###


class ProjectCollaborator(Resource):
    def get(self):
        collaborators = [collaborator.to_dict() for collaborator in ProjectCollaborators.query.all()]
        response = make_response(collaborators, 200)
        return response
    
    def post(self):
        collaborator = request.get_json()
        print(collaborator)
        new_collaborator_object = ProjectCollaborators(
            project_id = collaborator['project_id'],
            role = collaborator['role'],
            user_id = collaborator['user_id']
        )
        db.session.add(new_collaborator_object)
        db.session.commit()
        response = make_response(new_collaborator_object.to_dict(), 201)
        print(response)
        return (response)
    
class ProjectCollaboratorItem(Resource):
    def get(self, id):
        collaborators = ProjectCollaborators.query.filter_by(id=id).first()
        print(collaborators)
        response = make_response(collaborators.to_dict(), 200)
        return response

    def patch(self, id):
        data = request.get_json()
        print(id)
        collaborator = ProjectCollaborators.query.filter_by(id=id).first()
        print(data)
        print(collaborator)
        for attr in data:
            print(attr)
            setattr(collaborator, attr, data[attr])
        db.session.commit()
        
        #to do - add patch for adding collaborators
        response = make_response(collaborator.to_dict(), 200)
        return response

    def delete(self, id):
        collaborator = ProjectCollaborators.query.filter_by(id=id).first()
        db.session.delete(collaborator)
        db.session.commit()
        
        #to do - add patch for adding collaborators
        response = make_response([], 204)
        return response


api.add_resource(Home, '/api/')
api.add_resource(Users, '/api/users')
api.add_resource(UserItem, '/api//users/<int:id>')
api.add_resource(Projects, '/api//projects')
api.add_resource(ProjectItem, '/api//projects/<int:id>')
api.add_resource(ProjectCollaboratorItem, '/api/projects_collaborators/<int:id>')
api.add_resource(ProjectCollaborator, '/api/projects_collaborators')
# api.add_resource(Logout, '/logout')
# api.add_resource(Users, '/user')
# api.add_resource(UserItem, '/user/<int:id>')
# api.add_resource(Signup, '/signup')
# api.add_resource(Projects, '/projects')
# api.add_resource(ProjectItem, '/projects/<int:id>')
# api.add_resource(Keyword, '/keywords')
# api.add_resource(FileUpload, '/keyword_upload')
# api.add_resource(ProjectCollaborator, '/project_collaborators')
# api.add_resource(Login, '/login')
# api.add_resource(CheckSession, '/check_session', endpoint='check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

