//API key
const apiKey = '2149325f3e56496d9ac2cb4dd2456a6c';
const searchField = document.getElementById("search-input");
const searchButton = document.getElementsByClassName("search-button");
// console.log(searchButton[0]);

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data.articles);
        return data.articles;
    } catch(error){
        console.error("Error fetching random news!", error);
        return [];
    }
}

searchButton[0].addEventListener("click", async ()=>{
    const query = searchField.value.trim();
    console.log(query);
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch(error){
            console.log("Error fetching news by query!", error)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.articles);
        return data.articles;
    } catch(error){
        console.error("Error fetching random news!", error);
        return [];
    }
}

function displayBlogs(articles){
    // console.log(articles);
    blogContainer.innerHTML = "";
    articles.forEach((article)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        //creating images
        const img = document.createElement("img")
        img.src = article.urlToImage;
        img.alt = article.title;

        //creating title
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30)+"...":article.title;
        title.textContent = truncatedTitle;

        //creating description
        const description = document.createElement("p");
        const truncatedDesc =  article.description.length > 120 ? article.description.slice(0, 120)+ "...":article.description;
        description.textContent = truncatedDesc;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogContainer.appendChild(blogCard);

        //open news
        blogCard.addEventListener("click", ()=>{
            window.open(article.url, "_blank")
        })
        
        
    })
}


(async ()=>{
    try{
        // console.log("the function has been called")
        const articles = await fetchRandomNews();
        // console.log(articles);
        displayBlogs(articles);
    } catch(error){
        console.error("Error fetching random news!", error);
    }
})();

// fetchRandomNews();
// console.log(articles)