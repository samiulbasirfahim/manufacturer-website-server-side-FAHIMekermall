This web application server develop with nodejs, mongoose, express, 
i have use mailgun and nodemailer for send mail, 
all of my api are appears below

# Description:

## booking

-   https://manufacturer-website-server.herokuapp.com/booking \get all booking
-   https://manufacturer-website-server.herokuapp.com/booking(post) \add booking
-   https://manufacturer-website-server.herokuapp.com/booking/id(delete) \delete booking
-   https://manufacturer-website-server.herokuapp.com/booking/getOne/id \load part details by specific id
-   https://manufacturer-website-server.herokuapp.com/booking/count/ \get total number of booking
-   https://manufacturer-website-server.herokuapp.com/booking/pay/id(put) \pay payment
-   https://manufacturer-website-server.herokuapp.com/booking/email \get all of my orders

## part

-   https://manufacturer-website-server.herokuapp.com/part \get all part
-   https://manufacturer-website-server.herokuapp.com/part/id \get one part by id
-   https://manufacturer-website-server.herokuapp.com/part/count \get total number of parts
-   https://manufacturer-website-server.herokuapp.com/part(post) \add one part
-   https://manufacturer-website-server.herokuapp.com/part/id(delete) \delete one part

## review

-   https://manufacturer-website-server.herokuapp.com/review(post) \post review
-   https://manufacturer-website-server.herokuapp.com/review \get review
-   https://manufacturer-website-server.herokuapp.com/review/count \get the total number of reviews

## user

-   https://manufacturer-website-server.herokuapp.com/user(put) \create user, issue token
-   https://manufacturer-website-server.herokuapp.com/user/roles/email(put) \change roles (admin / user)
-   https://manufacturer-website-server.herokuapp.com/user/admin \get all admin
-   https://manufacturer-website-server.herokuapp.com/user/count \get total user count
-   https://manufacturer-website-server.herokuapp.com/user/email \get user information
-   https://manufacturer-website-server.herokuapp.com/user/email(put) \update user information

## email

-   https://manufacturer-website-server.herokuapp.com/email(post) \send email api
