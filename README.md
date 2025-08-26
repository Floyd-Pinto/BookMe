# BookMe - Train Booking System

A modern train booking platform built with Django REST Framework and Next.js.

## License

This project is licensed under the GNU License [https://github.com/Floyd-Pinto/BookMe/blob/main/LICENSE.md] - see the LICENSE file for details.

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Git

## Project Structure

```
BookMe/
├── backend/         # Django REST API
└── frontend/        # Next.js frontend
```

## Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/BookMe.git
cd BookMe
```

2. Create and activate virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Linux/Mac
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up environment variables:

```bash
cp .env.template .env
# Edit .env with your database credentials
```

5. Run migrations:

```bash
python manage.py migrate
```

6. Start the development server:

```bash
python manage.py runserver
```

## Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.template .env.local
# Edit .env.local with your settings
```

4. Start the development server:

```bash
pnpm dev
```

## Development Workflow

1. Create a new branch for your feature:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:

```bash
git add .
git commit -m "Description of your changes"
```

3. Push your branch:

```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub

## API Documentation

Backend API endpoints are available at:

- Development: http://localhost:8000/api/
- Documentation: http://localhost:8000/api/docs/

## Testing

### Backend Tests

```bash
cd backend
python manage.py test
```

### Frontend Tests

```bash
cd frontend
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


