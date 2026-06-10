# Portfolio CMS Backend

Django admin and REST API for managing portfolio content.

## Setup

```bash
cd backend
uv sync
uv run python manage.py makemigrations
uv run python manage.py migrate
uv run python manage.py seed_portfolio
uv run python manage.py createsuperuser
uv run python manage.py runserver 8000
```

Admin: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)  
Portfolio API: [http://127.0.0.1:8000/api/portfolio/](http://127.0.0.1:8000/api/portfolio/)

## Media Assets

Reusable CV, certificate, and image uploads are managed in Django admin under
Assets. Profile and certification forms can select an existing asset or add a new
one from the relation picker. Uploaded files are stored below `/media/assets/`.

## Frontend Integration

Create `frontend/.env.local` from the repo root:

```env
PORTFOLIO_API_URL=http://127.0.0.1:8000/api/portfolio/
```

The Next app uses the CMS as its content source. Keep the API running when building or previewing the frontend.
