# Healthcare SaaS Multi-Tenant Architecture

## Overview

This application is a multi-tenant healthcare SaaS platform.

Each hospital/organization is a separate tenant.

The architecture uses:

- Database per tenant
- Tenant-based subdomains
- Central master database
- Dynamic database connection
- Tenant-driven frontend routing
- Backend-driven theme configuration

---

# High Level Architecture

                Master Domain

            localhost:3000

                   |
                   |
          Landing / Registration

                   |
                   |
         Create Tenant Workspace

                   |
                   |
    ---------------------------------

    Tenant Workspace

    hospital1.lvh.me:3000

                |
                |
         Tenant Application

                |
                |
    hospital1.lvh.me:8000/api/*

                |
                |
      Dynamic Tenant Database

---

# Backend Architecture

## Technology

- PHP
- MySQL
- REST API
- Session / JWT authentication
- Dynamic database switching


---

# Database Design

## Master Database

Database:


master_db



The master database stores global information only.

It does NOT store tenant business data.


---

## tenants table

Stores all organizations.

Example:


tenants

id
name
subdomain
plan
database_name
theme_config
created_at



Example:

```json
{
 "id":"uuid",
 "name":"Apollo Hospital",
 "subdomain":"apollo771",
 "database_name":"tenant_apollo771_db",
 "plan":"pro",
 "theme_config":{
    "mode":"warm",
    "primaryColor":"#2563EB",
    "fontFamily":"Inter"
 }
}
domains table

Maps domains to tenants.

Structure:

domains

id
tenant_id
domain
type
created_at

Example:

tenant_id:
abc123

domain:
apollo771.lvh.me

type:
subdomain
Tenant Database

Every tenant gets a separate database.

Example:

tenant_apollo771_db

Contains:

users
patients
appointments
billing
staff
etc...

Tenant data never goes into master_db.

Tenant Creation Flow

User opens:

localhost:3000

Clicks:

Register

Frontend sends:

POST /api/tenants/register

Backend:

Creates tenant record
Creates tenant database

Example:

tenant_apollo771_db
Runs tenant migrations
Creates admin user
Returns:
{
 "success":true,
 "tenant_url":
 "http://apollo771.lvh.me:3000",

 "tenant_id":"uuid"
}

Frontend redirects:

apollo771.lvh.me:3000/login
Tenant Detection

Every request contains:

Host header

Example:

apollo771.lvh.me

Backend extracts:

apollo771

TenantMiddleware:

hostname
      |
      |
find domain
      |
      |
load tenant
      |
      |
switch database
Authentication Flow
Tenant Login

URL:

apollo771.lvh.me:3000/login

Frontend sends:

POST /api/login

Payload:

{
 "email":"",
 "password":""
}

IMPORTANT:

Do NOT send:

tenant_id

Tenant is detected from domain.

Backend:

Host
 |
 |
TenantMiddleware
 |
 |
tenant_apollo771_db
 |
 |
authenticate user
Public Login Flow

When user opens:

localhost:3000/login

Show:

Workspace Name

Continue

Example:

apollo771

Redirect:

apollo771.lvh.me:3000/login

Then normal login happens.

Returning User Flow

After login save:

localStorage.setItem(
"tenant_workspace",
"apollo771"
)

When user opens website again:

localhost:3000

Frontend checks:

tenant_workspace

If exists:

Show:

Welcome back

Apollo Hospital

Continue Login

Redirect:

apollo771.lvh.me/login
Frontend Architecture
Structure
src

├── app
│
├── modules
│   |
│   ├── auth
│   ├── tenant
│
├── pages
│
├── routes
│
├── services
│
├── themes
│
└── utils

Redux Structure
authSlice

Handles:

login
logout
user
token
tenantSlice

Handles:

registration
tenant details
theme config

State:

{
 loading:false,

 tenantDetails:{
   tenant_url:"",
   subdomain:""
 },

 themeConfig:{}
}
API Layer

All APIs go through:

apiService.js

Example:

apiService.post(
"/api/login",
data
)

Do not call axios directly inside components.

Theme System

Themes are tenant-specific.

Existing:

src/themes

darkTheme.js
warmTheme.js
GlobalStyle.js

Add:

tenantTheme.js

Responsibilities:

merge backend config
override colors
override fonts
override radius

Example backend:

{
 "mode":"dark",
 "primaryColor":"#00AEEF",
 "fontFamily":"Inter",
 "borderRadius":"8px"
}

Frontend:

ThemeProvider

      |
      |
createTenantTheme()

      |
      |
styled-components
Theme API

Tenant loads:

GET /api/tenants/theme

Response:

{
 "theme_config":{

 "mode":"warm",
 "primaryColor":"#2563EB",
 "fontFamily":"Poppins"

 }
}
Local Development
Frontend

Run:

npm install

npm run dev

Open:

http://localhost:3000

Tenant:

http://apollo771.lvh.me:3000
Backend

Start:

php -S localhost:8000 -t public

Backend:

http://localhost:8000
Important Development Rules
DO
Always test tenant URLs with lvh.me

Example:

apollo771.lvh.me
Keep tenant logic in middleware
Keep API calls inside modules
DO NOT

Do not:

send tenant_id from frontend login

Do not:

store tenant data in master_db

Do not:

hardcode localhost tenant URLs
Complete User Journey
Landing Page

      |

Register Organization

      |

Tenant Created

      |

apollo771.lvh.me/login

      |

Login

      |

Tenant Database Connected

      |

Dashboard

      |

Theme Loaded

      |

Application Ready