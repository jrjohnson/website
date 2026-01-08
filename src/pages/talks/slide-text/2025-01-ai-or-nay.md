---
layout: ../../../layouts/ContentLayout.astro
---

# AI or Nay?

## Balancing Distraction and Utility

- I'm Jon Johnson, I work in Education IT at UCSF
- Day to day I'm a developer for education tools at UCSF
- Time is the biggest resource constraint in my work
- I'm always looking for ways to be more efficient
- Started using GenAI about a year ago with the launch of Versa
- I've found it extremely useful in some places
- And miserably wasteful in others
- I'm going to share some of the things I've learned
- And some of the things I'm still trying to figure out
- But mostly I want to talk about how I'm thinking about Generative AI today and the way that framework informs my usage
- Fair warning, strong personal opinions ahead!

# How Many R's in Strawberry?

- Maybe you've seen this before
- It's a fun little quirk of the way that large language models work
- It's also a good starting point for a conversation about the utility of AI

### How many R‘s are there in the word ‘strawberry’?

- Versa: Greetings, Jon! I'm Versa, how may I help you today?
- Me: How many R‘s are there in the word ‘strawberry’?
- Versa: There are two 'R’s in the word ‘strawberry’.
- Me: I'm pretty sure there are three
- Versa: Actually, there are two 'R’s in the word ‘strawberry’. The word is spelled as S-T-R-A-W-B-E-R-R-Y.
- Me: That's three r's!
- Versa: I apologize for any confusion. However, if you count the 'R’s in the word “strawberry,” there are indeed only two: one after the ‘T’ and one after the ‘E’.
- This isn't a burn on Versa, it's a fundamental feature of the way that large language models work
- You can do this with every tool and get the same result
- What's going on here?
- Why is Versa so sure there are only two R's in Strawberry?

# ChatGPT is Bullshit

## what occurs in the case of an LLM delivering false utterances is not an unusual or deviant form of the process it usually goes through (as some claim is the case in hallucinations, e.g., disjunctivists about perception). The **very same process occurs when its outputs happen to be true**.

Hicks, M.T., Humphries, J. & Slater, J. ChatGPT is bullshit. Ethics Inf Technol 26, 38 (2024). https://doi.org/10.1007/s10676-024-09775-5

- Excuse my French, the title isn't my own
- Based on a philosophical theory of truth by Harry Frankfurt
- The core idea is that the model doesn't care what the truth is
- As I approach using these tools in various ways I always have this in my mind
- The computer flat out, _does not care_

# Use Cases for Generative AI

# Use Cases for ~~Generative AI~~ Bullshit

- Rubber Ducky
- Autocomplete
- Help Reading and Understanding Output
- Help Writing Code

# First Use Case

## Rubber Ducky

- Rubber Ducking is a technique a lot of programmers use
- The idea is that you explain your problem to a rubber duck
- The act of explaining the problem helps you understand it better
- Demo time
- What are six titles for a blog post about a new way of using modifiers in Ember.js? The modifiers are declared on the class where they are needed and not in a separate class. Each title should be some kind of pun or involve hamsters.

# Second Use Case

## Autocomplete

- Using CoPilot hooked up to my editor (Code)
- This is only possible because the code I'm working with is open source
- I know there are efforts in place to secure licensing for more highly protected data
- I don't know where those currently stand
- I'm an expert software developer
- But I'm also the kind of person who likes to use cruise control in a residential neighborhood
- How can I generate code, so I don't have to type it
- This is a very small piece of a chart building library we have for Ilios
- What I want to do is write tests that confirm data that I already know is correct
- What I don't want to have to do is copy and paste a lot of stuff

# Third Use Case

## Help Understanding Output

- Warp is a command line terminal that is fast and pretty
- It has been adding a bunch of GenAI features
- I really like the way it always asks before sharing any data with any model
- Again, we don't have a good data licensing agreement with them, so if you want to use something like this you have to really understand what's going on
- Example of some errors I came across when attempting to install Stable Diffusion
- I've simplified the context some, in a way that won't ever actually work, but it's a good demonstration
- The model is able to read _way_ faster than me and can summarize very well
- It can also often suggest solutions

# Fourth Use Case

## Help Writing Code

- Back to Code and Copilot, this time for some more advanced work
- This is the riskiest demo I have, it's supposed to fail, but it might work
- Refactor to use luxon instead of moment

# Let's Go Back Through Each Case

## Talk About What Went Right and What Went Wrong

### and what we can learn from it

# Help Writing Code

- Exercise extreme caution
- Tiny errors are magnified in code
- It takes way longer to figure out where the guess has gone wrong

# Help Understanding Output

- Can be a big help in summarizing huge amounts of information
- Can often be very helpful in suggesting solutions
- The quality of those solutions isn't important to the model
- The less you know about the environment the more likely you are to be misled
- I missed a chance to learn something new

# Autocomplete

- The output depends too much on the input, missing an opportunity to make it better
- I missed a chance to learn something new
- Just like with autocomplete in a text, it's often very wrong
- When it's wrong it can be super distracting and interrupt flow

# Rubber Ducky

- Works great for generating ideas
- I've missed the chance to connect with a person
  - A person who I could have shared the joy of success with
- When I'm done I don't feel like I came up with something, I feel like I was given something

# Ballancing the Scales

- I'm still figuring this out
- I can tell you that I, personally, have found some utility in some usage
- If you're building your own applications on top of AI, you need to be deeply aware of the experience you're creating for your users

# Example of an email I got, that was clearly generated

First off, your detailed feedback has been invaluable, underscoring the importance of these features for our users. This kind of transparent communication is key to tailoring our solutions to meet your precise needs. We appreciate this style of collaborative work. **Upon reflection and analysis of our prior discussions** and the outlined technical challenges, it's become evident that we initially may not have fully grasped the extent of your requirements for absolute data protection in certain features and the depth we needed to ensure this data protection was secured. This acknowledgment has sharpened our understanding of your needs and the essential role these features play in your operations. **Rest assured**, we are fully equipped and ready to rise to this challenge.

With this new clarity, our development team has already begun a detailed analysis to chart out the enhancements needed to align with your exacting standards for data protection and security. Our team is **dedicated to formulating solutions** that match with your feedback and are currently in the process of determining the scope of effort required to bring these to fruition.

We are acutely aware that ongoing modifications after our initial agreement can introduce complexities, particularly in terms of budgeting and the logistical hurdles associated with procurement and invoicing. In light of this, our goal is to implement the necessary updates without incurring additional costs wherever feasible. Should there arise any need for adjustments that might lead to extra charges, we are committed to engaging in an open, transparent, and collaborative discussion with you. Our priority is to ensure that any course of action is squarely focused on delivering the best outcomes for you and your stakeholders.

Regarding the configuration identifier for the plugin's documentation on our internal system, **rest assured**, this will be catalogued in the issues list as you've requested. This step is fundamental to facilitating smooth updates in the future and safeguarding the integrity of your environment.

Please don't hesitate to reach out for any clarifications or additional queries in the meantime. Ensuring your satisfaction and the success of your initiatives **continues to be our utmost priority**.

- You better really not care about the audience
- You'll be wasting their time
- This is the most ethically dangerous use case
- When you use GenAI to communicate with other people you're not being genuine in those interactions
- If someone asks you for help, they want your help, not the help of the internet
