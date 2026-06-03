# 🎬 NontonFilm

![PHP](https://img.shields.io/badge/PHP-8+-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Structure-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Style-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vanilla](https://img.shields.io/badge/Framework-None%20(Vanilla)-lightgrey?style=for-the-badge)

A full-featured social media platform for sharing videos, reels, and stories — built with vanilla PHP, MySQL, and JavaScript. Inspired by Instagram & TikTok.

**Tags:** `#PHP` `#VanillaPHP` `#MySQL` `#JavaScript` `#VanillaJS` `#HTML` `#CSS` `#SocialMedia` `#VideoSharing`

## ✨ Features

- 🎥 **Video & Reel Upload** — Upload videos, reels, and images with captions, hashtags, and music info
- 📖 **Stories** — 24-hour disappearing stories with text overlay and background colors
- 💬 **Direct Messaging** — Real-time chat between users
- 🔔 **Notifications** — Get notified for likes, comments, follows, reposts, and messages
- 🔍 **Search & Explore** — Discover users, videos, and trending hashtags
- 👤 **User Profiles** — Customizable profiles with avatar, bio, website, and post grid
- ❤️ **Social Interactions** — Like, comment, save, repost, follow/unfollow
- 📢 **Report & Block** — Content moderation with report reasons and user blocking
- 🌙 **Dark/Light Theme** — Theme toggle with localStorage persistence
- 📱 **Responsive Design** — Mobile-first layout with bottom navigation

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | PHP 8+ (vanilla, no framework) |
| Database | MySQL / MariaDB |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Server | Apache with mod_rewrite (.htaccess) |
| Auth | Session-based with password_hash/password_verify |

## 📁 Project Structure

```
nontonfilm/
├── index.php              # Entry point
├── config.php             # Configuration & helpers (gitignored)
├── config.example.php     # Config template
├── router.php             # URL routing
├── setup.php              # Database setup & seeder
├── migrate.php            # Additional migrations
├── .htaccess              # Apache rewrite rules
│
├── pages/                 # Page views
│   ├── auth/              # Login, register, logout
│   ├── home.php           # Main feed
│   ├── explore.php        # Explore/discover
│   ├── reels.php          # Reels viewer
│   ├── watch.php          # Video player
│   ├── upload.php         # Upload post
│   ├── upload_story.php   # Upload story
│   ├── profile.php        # User profile
│   ├── inbox.php          # Direct messages
│   ├── notifications.php  # Notifications
│   ├── search.php         # Search page
│   ├── settings.php       # Account settings
│   └── ...
│
├── api/                   # API endpoints (JSON)
│   ├── feed.php           # Feed data
│   ├── like.php           # Like/unlike
│   ├── comments.php       # Comments
│   ├── follow.php         # Follow/unfollow
│   ├── chat_api.php       # Chat messages
│   ├── story_api.php      # Story data
│   └── ...
│
├── includes/              # Shared layouts
│   ├── header.php
│   ├── footer.php
│   ├── sidebar.php
│   └── bottom_nav.php
│
├── assets/
│   ├── css/               # Stylesheets (per page)
│   ├── js/                # JavaScript modules
│   └── img/               # Static images
│
└── uploads/               # User uploads (gitignored)
    ├── avatars/
    ├── videos/
    ├── thumbnails/
    └── stories/
```

## 🚀 Installation

### Prerequisites

- PHP 8.0+
- MySQL 5.7+ / MariaDB 10.3+
- Apache with mod_rewrite enabled
- [Laragon](https://laragon.org/) (recommended for Windows) or XAMPP/WAMP

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdkupang/nontonfilm.git
   ```

2. **Place in web root**
   ```
   Move to: C:\laragon\www\nontonfilm (Laragon)
   Or: C:\xampp\htdocs\nontonfilm (XAMPP)
   ```

3. **Create config file**
   ```bash
   cp config.example.php config.php
   ```
   Edit `config.php` and update your database credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'nontonfilm');
   define('DB_USER', 'root');
   define('DB_PASS', 'your_password');
   ```

4. **Run database setup**
   
   Open in browser:
   ```
   http://localhost/nontonfilm/setup.php
   ```
   This creates all tables, upload directories, and seeds demo users.

5. **Run migrations** (additional features)
   ```
   http://localhost/nontonfilm/migrate.php
   ```

6. **Login with demo account**
   ```
   Username: admin
   Password: password
   ```

## 📸 Screenshots

> *Add your screenshots here*

## 🗄️ Database Schema

The application uses **14 tables**:

| Table | Description |
|-------|-------------|
| `users` | User accounts and profiles |
| `posts` | Videos, reels, and images |
| `stories` | 24-hour temporary stories |
| `story_views` | Story view tracking |
| `likes` | Post likes |
| `comments` | Post comments (with replies) |
| `comment_likes` | Comment likes |
| `saves` | Bookmarked posts |
| `reposts` | Reposted/shared posts |
| `follows` | Follow relationships |
| `messages` | Direct messages |
| `notifications` | User notifications |
| `hashtags` | Hashtag directory |
| `post_hashtags` | Post-hashtag relationships |

## 🔒 Security

- **Password hashing** — Uses `password_hash()` with bcrypt
- **SQL injection protection** — PDO prepared statements throughout
- **XSS prevention** — `htmlspecialchars()` via `e()` helper
- **CSRF mitigation** — AJAX requests verified with `X-Requested-With` header
- **Session-based auth** — Secure session management

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/like` | Like/unlike a post |
| POST | `/api/comment` | Add comment |
| POST | `/api/follow` | Follow/unfollow user |
| POST | `/api/save` | Save/unsave post |
| POST | `/api/repost` | Repost/unrepost |
| POST | `/api/upload` | Upload handler |
| GET/POST | `/api/chat` | Chat messages |
| GET/POST | `/api/story` | Story data |
| GET | `/api/feed` | Feed posts (paginated) |
| GET | `/api/suggested` | Suggested users |
| POST | `/api/report` | Report content |
| POST | `/api/block` | Block user |
| POST | `/api/post-actions` | Edit/delete post |
| GET/POST | `/api/profile` | Profile data & heartbeat |
| GET | `/api/search` | Search users & posts |
| GET/POST | `/api/notifications` | Notification data |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Abdillah**
