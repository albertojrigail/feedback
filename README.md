# feedback
Express web application that allows users to solve a coding puzzle, and test their solution using an online IDE. Upon submission, users get an email with a code snippet of their solution, and they are prompted to give feedback to someone else. Then, the feedback recipient will receive an email with feedback.

On the server side, the application connects to a MongoDB database to organize data from users, problems, feedback, and solutions, as well as sending emails.

More complex tasks such as sending emails, capturing snippets, and compiling code are managed by third-party APIs.
