# 🧩 Projeto Fullstack: Autenticação JWT com Spring Boot e Angular

Este projeto é uma aplicação web fullstack composta por um backend em **Spring Boot** e um frontend em **Angular**, com foco em autenticação baseada em **JWT**, controle de acesso por **roles**, persistência de dados em **PostgreSQL**, e versionamento de banco com **Flyway**.

---

## ⚙️ Tecnologias Utilizadas

### Backend (Spring Boot)
- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (JSON Web Token)
- Flyway (versionamento de banco de dados)

### Frontend (Angular)
- Angular CLI
- Angular Router
- Angular Forms
- Angular HTTP Client
- Bootstrap (ou outra lib de UI)

---

## 📐 Funcionalidades

### 🔐 Autenticação e Autorização
- Login e registro de usuários
- Geração de JWT no login
- Validação automática do token JWT em cada requisição
- Controle de acesso por roles (ex: ROLE_USER, ROLE_ADMIN)

### 🧑‍💻 Áreas do Sistema
- **Página de Login**: autenticação de usuários
- **Página de Registro**: criação de novo usuário
- **Área Autenticada**: dashboard acessível apenas com token válido
- **Controle de Rotas**: o acesso às rotas é baseado nas permissões do usuário (roles)

### 🗃️ Banco de Dados
- PostgreSQL como banco de dados relacional
- Flyway para versionamento de schema e migrações automatizadas

---

## 🗂️ Estrutura do Projeto

    /backend
    ├── src/main/java
    ├── src/main/resources/db/migration # scripts Flyway
    └── application.properties

    /frontend
    ├── src/app
    ├── components
    ├── services
    ├── guards
    └── models

---

## 🚀 Como Executar o Projeto

### 📌 Pré-requisitos
- Java 17+
- Node.js 18+
- Angular CLI
- PostgreSQL
- Docker (opcional)
- Maven

### 📦 Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 💻 Frontend
```bash
cd frontend
npm install
ng serve
```

### 🛠️ Flyway (Versionamento do Banco)
Os scripts de migração estão localizados em:

```path
src/main/resources/db/migration/
```

Para aplicar automaticamente as versões no banco ao iniciar a aplicação, certifique-se de configurar corretamente as credenciais e URL do PostgreSQL em application.properties.

### 🔐 Exemplo de Roles e Controle de Acesso
- `POST /api/auth/login`: Acesso público
- `POST /api/auth/register`: Acesso público
- `GET /api/user/me`: Acesso com ROLE_USER
- `GET /api/admin/users`: Acesso com ROLE_ADMIN


### 🧪 Testes
Backend: testes unitários com JUnit

Frontend: testes com Jasmine e Karma (se aplicável)

### 📄 Licença
Este projeto está licenciado sob a MIT License.