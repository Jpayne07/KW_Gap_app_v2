#!/usr/bin/env python3

# Standard library imports
from random import sample

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Project, ProjectCollaborators

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()

        # Seed Users
        users = []
        for _ in range(5):  # Creating 5 users
            user = User(
                username=fake.user_name(),
                name=fake.name(),
                profile_icon=fake.image_url(width=100, height=100)
            )
            user.password_hash = fake.password(length=10)
            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        # Seed Projects
        projects = []
        for _ in range(5):  # Creating 5 projects
            project = Project(
                logo=fake.file_name(extension="png"),
                brand_name=fake.company()
            )
            projects.append(project)

        db.session.add_all(projects)
        db.session.commit()

        # Seed Project Collaborators (Many-to-Many)
        roles = ["Owner", "Editor", "Viewer"]
        collaborators = []

        for project in projects:
            # Each project can have 2 to 3 unique collaborators
            chosen_users = sample(users, k=3)
            for user in chosen_users:
                role = sample(roles, k=1)[0]  # Choose a random role
                collaborator = ProjectCollaborators(
                    user_id=user.id,
                    project_id=project.id,
                    role=role
                )
                collaborators.append(collaborator)

        db.session.add_all(collaborators)
        db.session.commit()

        print("Database seeded successfully!")