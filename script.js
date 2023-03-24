const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealEl = document.getElementById('meals');
const resultHeading = document.getElementsByClassName('result_heading');
const single_mealEl = document.getElementById('single_meal')

// search meals
function searchMeal(e) {
    e.preventDefault();


    // clear single meal

    single_mealEl.innerHTML = "";

    // get search meals
    const term = search.value;

    // cheack for empty 
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                resultHeading.innerHTML = `<h2>Search result for ${term}`
                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2>The are no result for ${term}`
                } else {
                    mealEl.innerHTML = data.meals.map(
                        (meal) => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                    `
                    )
                        .join("");
                }
            });
    } else {
        alert('please insart a value in Search')
    }

}

// fetch meal by id

function getMealById(mealID) {
    fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    ).then(res => res.json())
        .then(data => {
            console.log(data)
            const meal = data.meal[0];
            addMealToDOM(meal)
        });
}

// add meal to DOM

function addMealToDOM(meal) {
    const ingredients = [];
    for(let i=0; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`
            ${meal[`strIngredients${i}`]} - ${meal[`strMeasure${i}`]}
            `);
        }else {
            break;
        }
    }
}

single_mealEl.innerHTML = `
<div class="single_meal">
<h1>${meal.strMeal}</h1>
<img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
<div class="single_meal_info">
${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
</div>
<div class="main">
<p>${meal.setInstructions}</p>
<h2>IngredientM</h2>
<ul>
${ingredients.map(ing => `<li>${ing}</li>`).join('')}
</ul>
</div>
</div>
`


// even listerners
submit.addEventListener('submit', searchMeal);
mealEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains("meal-info");
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealById(mealID)

    }
})