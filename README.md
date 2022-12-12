


Requirement To Test these API:Postman is required to hit the api.

Note: We are not using primarykey(isbn) in the table structure so if we send the same file twice then the record contained in the table will be multiple.Because i had used that provided url for testing if you use same url then you may got duplicate data.
Assignment 1:
1. Write software that reads the CSV data (of books, magazines, and authors) given on
the next page.

For this process you need to provide the url  and category in the request body.
url:https://csvreaderandknightmoves.herokuapp.com/csv/readcsv
Method:post
Reqbody:
{  
   "url":"https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv",
   "category":"authors"
}




Response:
{
   "result": [
       {
           "email": "null-walter@echocat.org",
           "firstname": "Paul",
           "lastname": "Walter"
       },
       {
           "email": "null-mueller@echocat.org",
           "firstname": "Max",
           "lastname": "Müller"
       },
       {
           "email": "null-ferdinand@echocat.org",
           "firstname": "Franz",
           "lastname": "Ferdinand"
       },
       {
           "email": "null-gustafsson@echocat.org",
           "firstname": "Karl",
           "lastname": "Gustafsson"
       },
       {
           "email": "null-lieblich@echocat.org",
           "firstname": "Werner",
           "lastname": "Lieblich"
       },
       {
           "email": "null-rabe@echocat.org",
           "firstname": "Harald",
           "lastname": "Rabe"
       }
   ]
}

Here category values may be = books,magazines,authors

what happens if you hit this api?
-it will first download the file from the url and convert it to json and store in the table according to the categories passed so that we can perform further operation using database.

-and also it will delete that temp file.



2. Print out all books and magazines (on either console UI) with all their details (with a
meaningful output format).

-here you just need to send category(books,magazines,authors
) in the req body.
-based on that it will retrieve the record from database.

url:https://csvreaderandknightmoves.herokuapp.com/csv/getBookMagazineAuthor
Method: Post
reqBody:
{
   "category":"magazines"
}
Response:
{
   "details": [
       {
           "Title": "Beautiful cooking",
           "ISBN": "5454-5587-3210",
           "Authors": "null-walter@echocat.org",
           "PublishedAt": "21.05.2011"
       },
       {
           "Title": "My familie and me",
           "ISBN": "4545-8541-2012",
           "Authors": "null-mueller@echocat.org",
           "PublishedAt": "10.07.2011"
       },
       {
           "Title": "Cooking for gourmets",
           "ISBN": "2365-5632-7854",
           "Authors": "null-lieblich@echocat.org,null-walter@echocat.org",
           "PublishedAt": "01.05.2012"
       },
       {
           "Title": "Gourmet",
           "ISBN": "2365-8745-7854",
           "Authors": "null-ferdinand@echocat.org",
           "PublishedAt": "14.06.2010"
       },
       {
           "Title": "The Wine Connoisseurs",
           "ISBN": "2547-8548-2541",
           "Authors": "null-walter@echocat.org",
           "PublishedAt": "12.12.2011"
       },
       {
           "Title": "Vinum",
           "ISBN": "1313-4545-8875",
           "Authors": "null-gustafsson@echocat.org",
           "PublishedAt": "23.02.2012"
       }
   ]
}





3. Find a book or magazine by its ISBN.
And 
4. Find all books and magazines by their authors’ email.

Note:Only send one isbn or author at a time.

Url: https://csvreaderandknightmoves.herokuapp.com/csv/findmatchingrecord

reqBody:
{
   "category":"books",
   "isbn":"",
   "author":"null-walter@echocat.org"
}

Response:
{
   "details": [
       {
           "Title": "Ich helfe dir kochen. Das erfolgreiche Universalkochbuch mit großem Backteil",
           "ISBN": "5554-5545-4518",
           "Authors": "null-walter@echocat.org",
           "description": "Auf der Suche nach einem Basiskochbuch steht man heutzutage vor einer Fülle von Alternativen. Es fällt schwer, daraus die für sich passende Mixtur aus Grundlagenwerk und Rezeptesammlung zu finden. Man sollte sich darüber im Klaren sein, welchen Schwerpunkt man setzen möchte oder von welchen Koch- und Backkenntnissen man bereits ausgehen kann."
       },
       {
           "Title": "Genial italienisch",
           "ISBN": "1024-5245-8584",
           "Authors": "null-lieblich@echocat.org,null-walter@echocat.org,null-rabe@echocat.org",
           "description": "Starkoch Jamie Oliver war mit seinem VW-Bus in Italien unterwegs -- und hat allerlei kulinarische Souvenirs mitgebracht. Es lohnt sich, einen Blick in sein Gepäck zu werfen..."
       },
       {
           "Title": "Schuhbecks Kochschule. Kochen lernen mit Alfons Schuhbeck ",
           "ISBN": "1215-4545-5895",
           "Authors": "null-walter@echocat.org",
           "description": "Aller Anfang ist leicht! Zumindest, wenn man beim Kochenlernen einen Lehrer wie Alfons Schuhbeck zur Seite hat. Mit seiner Hilfe kann auch der ungeschickteste Anfänger beste Noten für seine Gerichte bekommen. Der Trick, den der vielfach ausgezeichnete Meisterkoch dabei anwendet, lautet visualisieren. Die einzelnen Arbeitsschritte werden auf Farbfotos im Format von ca. 3x4 cm abgebildet. Unter diesen stehen kurz und knapp die Angaben zur Zubereitung. So präsentiert Schuhbecks Kochschule alles bequem auf einen Blick. Und der interessierte Kochneuling kann sich auf die Hauptsache konzentrieren – aufs Kochen. Wie die Speise aussehen soll, zeigt jeweils das Farbfoto auf der linken Seite, auf der auch die Zutaten – dank des geschickten Layouts – ebenfalls sehr übersichtlich aufgelistet sind. Außerdem gibt Schuhbeck prägnante Empfehlungen zu Zutaten und Zubereitung."
       }
   ]
}

5. Print out all books and magazines with all their details sorted by title. This sort
should be done for books and magazines together.


url:https://csvreaderandknightmoves.herokuapp.com/csv/bookmagazinesortbytitle

Method:Post

Response:Combined Result of book and magazines sorted by title

{
   "details": [
       {
           "Title": "Beautiful cooking",
           "ISBN": "5454-5587-3210",
           "Authors": "null-walter@echocat.org",
           "PublishedAt": "21.05.2011"
       },
       {
           "Title": "Cooking for gourmets",
           "ISBN": "2365-5632-7854",
           "Authors": "null-lieblich@echocat.org,null-walter@echocat.org",
           "PublishedAt": "01.05.2012"
       },
       {
           "Title": "Das Perfekte Dinner. Die besten Rezepte",
           "ISBN": "2221-5548-8585",
           "Authors": "null-lieblich@echocat.org",
           "description": "Sie wollen auch ein perfektes Dinner kreieren? Mit diesem Buch gelingt es Ihnen!"
       },
       {
           "Title": "Das Piratenkochbuch. Ein Spezialitätenkochbuch mit den 150 leckersten Rezepten ",
           "ISBN": "3214-5698-7412",
           "Authors": "null-rabe@echocat.org",
           "description": "Das Piraten-Kochbuch beweist, dass die Seeräuberkapitäne zwar gefürchtete Haudegen waren, andererseits aber manches Mal mit gehobenenem Geschmacksempfinden ausgestattet. ... Kurzum, ein ideales Buch, um maritime Events kulinarisch zu umrahmen."
       },
       {
           "Title": "Das große GU-Kochbuch Kochen für Kinder",
           "ISBN": "2145-8548-3325",
           "Authors": "null-ferdinand@echocat.org,null-lieblich@echocat.org",
           "description": "Es beginnt mit... den ersten Löffelchen für Mami, Papi und den Rest der Welt. Ja, und dann? Was Hersteller von Babynahrung können, das ist oft im Handumdrehen auch selbst gemacht, vielleicht sogar gesünder, oftmals frischer. Ältere Babys und Schulkinder will das Kochbuch ansprechen und das tut es auf eine verspielte Art angenehm altersgemäß."
       },
       {
           "Title": "Genial italienisch",
           "ISBN": "1024-5245-8584",
           "Authors": "null-lieblich@echocat.org,null-walter@echocat.org,null-rabe@echocat.org",
           "description": "Starkoch Jamie Oliver war mit seinem VW-Bus in Italien unterwegs -- und hat allerlei kulinarische Souvenirs mitgebracht. Es lohnt sich, einen Blick in sein Gepäck zu werfen..."
       },
       {
           "Title": "Gourmet",
           "ISBN": "2365-8745-7854",
           "Authors": "null-ferdinand@echocat.org",
           "PublishedAt": "14.06.2010"
       },
       {
           "Title": "Ich helfe dir kochen. Das erfolgreiche Universalkochbuch mit großem Backteil",
           "ISBN": "5554-5545-4518",
           "Authors": "null-walter@echocat.org",
           "description": "Auf der Suche nach einem Basiskochbuch steht man heutzutage vor einer Fülle von Alternativen. Es fällt schwer, daraus die für sich passende Mixtur aus Grundlagenwerk und Rezeptesammlung zu finden. Man sollte sich darüber im Klaren sein, welchen Schwerpunkt man setzen möchte oder von welchen Koch- und Backkenntnissen man bereits ausgehen kann."
       },
       {
           "Title": "My familie and me",
           "ISBN": "4545-8541-2012",
           "Authors": "null-mueller@echocat.org",
           "PublishedAt": "10.07.2011"
       },
       {
           "Title": "O'Reillys Kochbuch für Geeks",
           "ISBN": "2215-0012-5487",
           "Authors": "null-mueller@echocat.org",
           "description": "Nach landläufiger Meinung leben Geeks von Cola und TK-Pizza, die sie nachts am Rechner geistesabwesend in sich reinschlingen. Soweit das Klischee! Dass aber Kochen viel mit Programmieren zu tun hat, dass es nämlich ähnlich kreativ ist, dass viele Wege zum individuellen Ziel führen und dass manche Rezepte einfach nur abgefahren und -- ja, geekig sind: Das zeigen zwei Köchinnen in diesem Buch."
       },
       {
           "Title": "Schlank im Schlaf ",
           "ISBN": "4545-8558-3232",
           "Authors": "null-gustafsson@echocat.org",
           "description": "Schlank im Schlaf klingt wie ein schöner Traum, aber es ist wirklich möglich. Allerdings nicht nach einer Salamipizza zum Abendbrot. Die Grundlagen dieses neuartigen Konzepts sind eine typgerechte Insulin-Trennkost sowie Essen und Sport im Takt der biologischen Uhr. Wie die Bio-Uhr tickt und was auf dem Speiseplan stehen sollte, hängt vom persönlichen Urtyp ab: Nomade oder Ackerbauer?"
       },
       {
           "Title": "Schuhbecks Kochschule. Kochen lernen mit Alfons Schuhbeck ",
           "ISBN": "1215-4545-5895",
           "Authors": "null-walter@echocat.org",
           "description": "Aller Anfang ist leicht! Zumindest, wenn man beim Kochenlernen einen Lehrer wie Alfons Schuhbeck zur Seite hat. Mit seiner Hilfe kann auch der ungeschickteste Anfänger beste Noten für seine Gerichte bekommen. Der Trick, den der vielfach ausgezeichnete Meisterkoch dabei anwendet, lautet visualisieren. Die einzelnen Arbeitsschritte werden auf Farbfotos im Format von ca. 3x4 cm abgebildet. Unter diesen stehen kurz und knapp die Angaben zur Zubereitung. So präsentiert Schuhbecks Kochschule alles bequem auf einen Blick. Und der interessierte Kochneuling kann sich auf die Hauptsache konzentrieren – aufs Kochen. Wie die Speise aussehen soll, zeigt jeweils das Farbfoto auf der linken Seite, auf der auch die Zutaten – dank des geschickten Layouts – ebenfalls sehr übersichtlich aufgelistet sind. Außerdem gibt Schuhbeck prägnante Empfehlungen zu Zutaten und Zubereitung."
       },
       {
           "Title": "The Wine Connoisseurs",
           "ISBN": "2547-8548-2541",
           "Authors": "null-walter@echocat.org",
           "PublishedAt": "12.12.2011"
       },
       {
           "Title": "Vinum",
           "ISBN": "1313-4545-8875",
           "Authors": "null-gustafsson@echocat.org",
           "PublishedAt": "23.02.2012"
       }
   ]
}

6. Add a book and a magazine to the data structure of your software and export it to a
new CSV file.

-for this part use this link in browser  what it will do is it will get the combined result of book and magazine from database and convert it to csv which will be downloadable.



https://csvreaderandknightmoves.herokuapp.com/csv/convertjson2csv




Assignment 2:
1. Write a program that takes the position of a Knight as an input on an 8x8
chessboard.
2. Given the position of the Knight, find all the possible places where the Knight can
move. You can assume that there are no pieces of the opposite color and hence no
blocks.

Assumption:Only one knight can be at any place and ther is no blocker in the board.

rowPos-starts from 1 and end to 8
colPos-Starts from 1 end to 8

Url:
https://csvreaderandknightmoves.herokuapp.com/chess/findknightroutes

reqBody:
{
   "rowPos":3,
   "colPos":3
}

resPonse:
{
   "knightMoves": [
       {
           "rowPos": 1,
           "colPos": 2
       },
       {
           "rowPos": 1,
           "colPos": 4
       },
       {
           "rowPos": 5,
           "colPos": 2
       },
       {
           "rowPos": 5,
           "colPos": 4
       },
       {
           "rowPos": 2,
           "colPos": 1
       },
       {
           "rowPos": 4,
           "colPos": 1
       },
       {
           "rowPos": 2,
           "colPos": 5
       },
       {
           "rowPos": 4,
           "colPos": 5
       }
   ]
}

