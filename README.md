# Megatron Reels Website

A mobile-first React reels experience inspired by Instagram Reels and TikTok.

## Features

- Full-screen vertical video, image, and YouTube reel feed
- One video visible at a time
- Smooth snap scrolling
- Category-wise filtering with Courses subcategory chips
- Fixed bottom navigation
- Floating like, share, WhatsApp, call, message, and Website actions
- Google Maps Direction popup for Megatron Multimedia, KK Market, Satra Road, Pune
- Join Class admission form stored in Firestore
- Fullscreen career portal modal for job applicants and hiring companies
- Firestore-backed message/comment popup over reels
- Autoplay, tap to pause/play, mute/unmute, and progress bar
- Lazy video loading with poster thumbnails
- Facebook-style premium blue UI built with Tailwind CSS and Framer Motion
- Firebase Authentication and Firestore
- Cloudinary video/image uploads and YouTube URL support

## Run

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Contact Links

- Call: `9890044900`
- WhatsApp/contact text opens inside the in-app share/contact experience.

## Admin Login

Admin routes are protected with Firebase Authentication and React Router.

1. Create a Firebase project.
2. Enable Authentication > Email/Password sign-in.
3. Create this admin user in Firebase Authentication:

```text
Email: admin@megatron.com
Password: Admin@123
```

4. Copy `.env.example` to `.env` and add your Firebase web app config.
5. Enable Firestore Database.
6. Open `/admin`. Unauthorized users are redirected to `/admin-login`.

The app only allows `admin@megatron.com` into the dashboard and keeps the admin session logged in using Firebase local persistence.

## Firebase Collections

- `reels`: title, caption, category, optional course subcategory, media URL, media type (`video`, `image`, or `youtube`), poster URL, status, analytics, and Cloudinary public IDs.
- `categories`: category labels/order for admin-managed filters.
- `courseSubcategories`: course subcategory labels/order for Courses filters.
- `messages`: lead/contact messages shown in the message dashboard.
- `jobApplicants`: candidate career form submissions, including resume URL when Cloudinary is configured.
- `hiringCompanies`: company hiring requests from the career portal.
- `admissions`: Join Class admission form submissions.

## Cloudinary Uploads

1. Create a Cloudinary unsigned upload preset.
2. Add `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` to `.env`.
3. Admin uploads send videos to `reels/videos`, images to `reels/images`, and thumbnails to `reels/images`.
4. Firestore stores the returned Cloudinary secure URLs and public IDs.

For production data security, protect Firestore with rules that check the signed-in admin email. Cloudinary asset deletion requires a signed server-side API call, so the React dashboard removes the Firestore reel record; add a small secured backend or Cloud Function if you also want to destroy Cloudinary assets automatically.
