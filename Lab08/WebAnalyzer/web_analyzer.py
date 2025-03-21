import requests
from bs4 import BeautifulSoup
import re
import matplotlib.pyplot as plt

def get_soup(url):
    try:
        response = requests.get(url)
        response.raise_for_status() # Ensures the request was successful
        soup = BeautifulSoup(response.text, 'html.parser')
        print(f"Successfully fetched content from {url}")
        return soup
    except Exception as e:
        print(f"Error fetching content: {e}")

def word_frequency(soup):
    words = re.findall('[a-z]+', soup.get_text(strip = True).lower())
    count_dict = {}
    for word in words:
        if word in count_dict:
            count_dict[word] = count_dict[word]+1
        else:
            count_dict[word] = 1
    return count_dict

def main():
    #2.
    soup = get_soup("https://en.wikipedia.org/wiki/University_of_Calgary")
    print(soup.prettify())
    input("\nPress Enter to continue.\n")

    #3.
    headings = sum([len(soup.find_all(f'h{i+1}')) for i in range(6)])
    links = len(soup.find_all('a'))
    paragraphs = len(soup.find_all('p'))
    print(f"There are {headings} headings.")
    print(f"There are {links} links.")
    print(f"There are {paragraphs} paragraphs.")
    input("\nPress Enter to continue.\n")

    #4.
    usr_input = input("Input a keyword to search for in the website's text:\n")
    output = len(soup.get_text().split(usr_input))-1
    print(f'There were {output} occurences of \"{usr_input}\" in the text.')
    input("\nPress Enter to continue.\n")

    #5.
    frequency = word_frequency(soup)
    sorted_frequency = sorted(frequency.items(), key = lambda item: item[1], reverse=True)
    print("The most frequent words are:")
    for word in sorted_frequency[0:5]:
        print(f"\t{word[0]} ({word[1]} occurences)")
    input("\nPress Enter to continue.\n")

    #6.
    pars = [p.get_text().split() for p in soup.find_all('p') if len(p.get_text().split()) > 5]
    max_p = pars[0]
    for p in pars:
        if len(p) > len(max_p):
            max_p = p
    print("The longest paragraph is:\n")
    print(' '.join(max_p))
    print(f"\nwhich has {len(max_p)} words")
    input("\nPress Enter to continue.\n")

    #7.
    labels = ['Headings', 'Links', 'Paragraphs']
    values = [headings, links, paragraphs]
    plt.bar(labels, values)
    plt.title('44')
    plt.ylabel('Count')
    plt.show()

if __name__ == "__main__":
    main()