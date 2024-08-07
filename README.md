# Fetch Coding Exercise
 
 ## Challenge
 1. Play around with the website and find the best algorithm (minimum number of weighings for any possible
 fake bar position) to find the fake gold bar.
 2. Create the test automation project using any preferred language to perform
 a. clicks on buttons (“Weigh”, “Reset”)
 b. Getting the measurement results (field between the 'bowls')
 c.
 filling out the bowls grids with bar numbers (0 to 8)
 d. getting a list of weighing
 e. Clicking on the gold bar number at the bottom of the website and checking for the alert message
 3. Code the algorithm from step 1 which uses a set of actions from step 2 to find the fake gold bar
    
 The algorithm should populate and weigh gold bars until a fake one is found, click on a fake bar number, output the
 alert message, number of weighing, and list of weighing made.

## Installation and Running
1. Clone the repository

Ex: ```git clone https://github.com/NoahTN/Fetch-Coding-Exercise.git```
2. Install npm packages

```npm install```
3. Run Playwright testing UI

```npx playwright test --ui```
4. Run the "find fake gold" test