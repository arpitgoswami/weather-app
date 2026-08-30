<img width="1897" height="829" alt="rain" src="https://github.com/user-attachments/assets/2cffb5a4-6204-4a07-9d88-510033e70af1" />

# Weather App

## Overview
A lightweight, responsive weather application built with **HTML**, **Tailwind CSS**, and **Supabase**. Users can enter any location—city name, latitude/longitude, or address—and instantly view up‑to‑date weather information such as temperature, conditions, humidity, and wind speed.

## Features
- **Global coverage** – supports any location worldwide through Supabase’s weather endpoint.  
- **Real‑time updates** – fetches current forecasts and hourly predictions automatically.  
- **Clean UI** – fully styled with Tailwind CSS, ensuring a modern look on desktop and mobile.  
- **Minimal dependencies** – relies only on vanilla HTML, Tailwind, and Supabase for backend services.  
- **Open source** – licensed under the MIT license, encouraging community contributions.

## Technology Stack
| Layer | Tool |
|-------|------|
| Frontend | HTML5, Tailwind CSS |
| Backend / Data | Supabase (PostgreSQL + Realtime) |
| Styling | Tailwind CSS (custom config) |

## License
This project is released under the **MIT License**. Feel free to use, modify, and distribute the code as long as you include the original copyright notice and license text.

## How It Works
1. The user enters a location (e.g., “London”, “40.7128,-74.0060”) into the input field.  
2. The app sends an HTTP request to Supabase’s weather endpoint with the provided parameters.  
3. Supabase returns structured weather data, which the frontend renders into a card layout using Tailwind classes.  
4. The UI updates dynamically, displaying temperature, condition, humidity, wind, and a brief forecast summary.

## Credits & Acknowledgments
- **Supabase** – reliable cloud database and API service.  
- **Tailwind CSS** – utility‑first CSS framework for rapid, responsive design.  

*Feel free to open issues or pull requests to suggest enhancements.*
