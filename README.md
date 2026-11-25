# Jargonot 
Jargonot is a mobile web app that makes complex research papers more accessible for students and researchers by allowing users to filter by their interests, summarizing the content of the paper, simplifying the language used in the paper, and letting users save helpful papers. 


## Product Vision Statement

Jargonot aims to be the primary resource to help students explore new areas of research and understand papers from outside of their field of expertise. 

It will employ a search and filter system, so users can easily find and access papers that match their needs, and a favorite system, so users can easily keep and locate papers they found useful. Users will be able to view the original paper as well as a "de-jargoned" version that simplifies complex language and improves readability for a non-expert. They will also be able to view a summary to quickly determine if the paper fits within their interests. 

## Team Members
Name           | GitHub Username
---------------|----------------------------------------
Kenny Buchanan | [kennybuchanan](https://github.com/kennybuchanan)
Saudha Shaheen | [saudhashaheen](https://github.com/saudhashaheen)
Tim Xu         | [TimXu2006](https://github.com/TimXu2006)
Francois Ni    | [Nip403](https://github.com/nip403)

## Project Origins 
The idea started as a collaboration between [Aditi Adhikari](https://github.com/aditiadhikari05) and [Saudha Shaheen](https://github.com/saudhashaheen) in order to help students access information that is outside of their field of expertise. It seeks to make research easier and more accessible. The original product repository can be found [here](https://github.com/AditiAdhikari05/project-proposal).

## Contributing

Our team uses a feature-branch workflow: developing changes in separate branches and creating a single product through pull requests. 

For further details on our collaboration norms, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## Build & Test

To deploy and test Jargonot locally, first clone this repo:
```
git clone https://github.com/agile-students-fall2026/generic-mern-stack-project-jargonot.git
cd generic-mern-stack-project-jargonot
```

Then, enter the backend:
```
cd back-end
```

For backend deployment, you need to set up your .env file:
1. Duplicate the `.env.example` file located in the `back-end` folder, and rename it to `.env`.
2. Set up your Mockaroo account. For graders, skip this to (3).
    - Create a Mockaroo account if you haven't already.
    - Open [our shared schema](https://mockaroo.com/befa3120) and clone/save it to your account.
    - Create a Mock API endpoint called jargonot_research_articles and add this:
    ```
    schema "Jargonot Research Articles"
    generate 20
    ```
    - You can check your `MOCKAROO_API_KEY` and `MOCKAROO_API_URL` on your API page.
3. Fill in the fields of the `.env` file according to your Mockaroo info. We have already set up an account for graders:
```
MOCKAROO_API_KEY=b6cb4c50
MOCKAROO_API_URL=https://my.api.mockaroo.com/jargonot_research_articles.json
PORT=3001
```

Use npm to install packages and start connection:
```
npm install
npm start
```

In a new terminal, navigate to the frontend:
```
cd front-end
```

Then use npm to install packages and run the app:
```
npm install
npm run dev
```

### Testing
From the `back-end` directory, run `npm test`.

## Resources
[arXiv Computing Research Repository](https://info.arxiv.org/help/cs/index.html).
