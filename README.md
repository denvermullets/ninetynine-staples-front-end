
# 99 Staples

This is a Magic: The Gathering collection app w/deck building capabilities (coming soon)

## Description

This app pulls down the JSON file of all existing cards from MTGJSON.com and iterates and compares to what the database currently has. If there's a new card or a change, then we update the record. We also pull some information from Scryfall's API (while respecting API ratelimit requests) to keep our images up to date.

I opted to created my own database so that the client would only have to make 1 API request instead of hundreds of calls to Scryfall or others per user per page. Some services have pretty limiting requirements (fair!) and while I could implement some caching to get around this, I felt it was best to maintain a database of cards. This allows the app to play with custom deck building ideas that integrate nicely while keeping the response time as low as possible.


## Tech Stack

**Client:** React, Typescript, Chakra-UI

**Server:** Ruby on Rails, Sidekiq, REDIS, JWT (auth)

**Deployment:** Render

## Screenshots

![Collection screenshot](https://user-images.githubusercontent.com/47340962/212079083-d1da8c75-7fd5-4df0-a99a-0fc1a3aa74e2.png)

![Collection screenshot](https://user-images.githubusercontent.com/47340962/212096034-30f04595-8c77-468a-b0d6-bd906c87a0a4.png)

## Acknowledgements

 - [Mana font](https://mana.andrewgioia.com/)
 - [Keyrune](https://keyrune.andrewgioia.com/)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)

