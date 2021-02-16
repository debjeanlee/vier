# Projekt-Vier

## Description

A real-time restaurant service web app targeted at restaurants looking for ways to increase their service capabilities while reducing costs.

Vier is a browser-based web application that allows users to order food items via their own mobile devices, while getting real time updates from other users at the same table. Orders are sent to the kitchen and service crew real time, and customers are able to get live updates on their orders.

Selling points:

- No need to download extra app
- Reduces service costs
- Minimal extra hardware required on restaurant fronts
- Environmentally friendly with less paper wastage on docket tickets

## User Story

1. Service staff seats customers and creates new session at table by tapping '+' sign on service dashboard.
1. Customers scan QR code, which leads them to interactive browser menu on their mobile devices, then proceed to place orders.
1. Once orders are placed, order gets sent to service crew for approval.
1. When service crew confirms the order, orders are sent to the kitchen.
1. Kitchen prepares orders and updates individual item status.
1. Once items are prepared, service crew sends out items to customers.
1. Order is completed.

## App Preview

##### Customer Facing Menu

![menu](/readme/menus.png)

- Customers get real time updates

![placeorder](/readme/video.gif)

- Placed orders update service side immediately

##### Service Crew Dashboard

![servicedb](/readme/service.png)

- Service crew dashboard

![service](/readme/service1.png)

- Expanded table view of service dashboard

##### Kitchen Crew Dashboard

![kitchen](/readme/kitchen.png)

- Kitchen crew dashboard

## Team

Jonas - Team Leader / Frontend Developer

- led team of 3 and developed customer facing menus & service crew dashboard

Eskaine - Tech Lead / Git Master

- Git master, implemented socket.io and setup project with webpack

Deborah - Backend Developer / Frontend Developer

- Responsible for server side logic on backend
- Assisted with frontend development for menus and kitchen dashboards

## TechStack

- MongoDB
- ExpressJS
- ReactJS
- NodeJS
- SASS
- Socket.IO
- Sass
- Webpack
- ESLint

## Future Improvements

- complete socket.io integration
- improve design of service and kitchen dashboards
