# Portfolio CMS Backend

Django admin and REST API for managing the portfolio content that used to live in `frontend/data/cv.ts`.

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

## Frontend Integration

Create `frontend/.env.local` from the repo root:

```env
PORTFOLIO_API_URL=http://127.0.0.1:8000/api/portfolio/
```

The Next app will use the CMS when that environment variable is available. If the API is offline, it falls back to `frontend/data/cv.ts` so builds and previews still work.
