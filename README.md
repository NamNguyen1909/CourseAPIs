# Django Project

## 📌 Installation

### 1. Clone the repository
```sh
git clone <repository-url>
cd <project-folder>
```

### 2. Create a virtual environment
```sh
python -m venv venv
```

### 3. Activate the virtual environment
#### Windows:
```sh
venv\Scripts\activate
```
#### macOS/Linux:
```sh
source venv/bin/activate
```

### 4. Install dependencies
```sh
pip install -r requirements.txt
```

## 📌 Freeze Requirements
To save the installed dependencies into `requirements.txt`, run:
```sh
pip freeze > requirements.txt
```

## 📌 Basic Django Commands

### 1. Run the server
```sh
python manage.py runserver
```

### 2. Create migrations
```sh
python manage.py makemigrations
```

### 3. Apply migrations
```sh
python manage.py migrate
```

### 4. Create a superuser (admin)
```sh
python manage.py createsuperuser
```

### 5. Collect static files
```sh
python manage.py collectstatic
```

### 6. Create a Django app
```sh
python manage.py startapp <app_name>
```

### 7. Check for errors
```sh
python manage.py check
```

### 8. Run Django shell
```sh
python manage.py shell
```

### 9. Show all available commands
```sh
python manage.py help
```

### 10. Show database migrations status
```sh
python manage.py showmigrations
```

### 11. Reset database (Dangerous, use with caution!)
```sh
python manage.py flush
```

### 12. Create a custom Django command
```sh
python manage.py startapp management/commands
```

## 📌 Running the Application
Ensure the virtual environment is activated.
Run the server:
```sh
python manage.py runserver
```

Open your browser and go to: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## 📌 Admin Panel
Access: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

Login with the superuser credentials created earlier.

## 📌 License
This project is licensed under the MIT License.
