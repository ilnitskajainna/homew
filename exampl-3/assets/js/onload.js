const API_KEY = '6c2f978356ec0ddc45cecbee3ebf1d7c';
const OMDB_KEY = '621d1d15';


///////// функции для поиска на  OMDB /////////////////

function selectChanged() {  
    let sel = $('#service').val();
    if (sel == "OMDB") {
        $('#type').show();
    } else {
        $('#type').hide();
    }             
}



/////////////////функция для выбора сайта////////////////////
function search($btn){ 
    selectChanged();
    if($('#service').val() == "OMDB") {
        searchOMDB($btn);
    } else {
        searchFilms($btn);
    }
}

/////////////////функция для поиска по сайту OMDB////////////////////
function searchOMDB($btn) { 
    if (!$btn.hasClass("disabled")) {
        $btn.addClass("disabled");
        $.ajax({
            url: 'https://www.omdbapi.com/?apikey='+ OMDB_KEY + '&s=' + $("#search").val() + '&type=' + $('#type').val(),
            type: 'get',
            dataType: 'json',
            success: function(json) {
                let rez = '',
                    item;
                if(json.Search.length != 0) {
                    for(let i = 0; i < json.Search.length; i++) {
                        item = json.Search[i];
                        image = (item.hasOwnProperty('Poster')) ? item.Poster : 'https://via.placeholder.com/200x300.png?text=No poster';
                        rez += `
                        <div class="film_item">
                            <div class="film_poster">
                                <img src="${image}" alt="${item.Title}">
                            </div>
                            <div class="film_info">
                                <h4>${item.Title}</h4>
                                <div><b>Year:</b>${item.Year}</div>
                                <div class="btn_wrap">
                                    <a href="javascript:void(0)" data-id="${item.imdbID}" onclick="getDetail($(this))" class="btn">Detail info</a>
                                </div>
                            </div>
                            <div class="film_detail"></div>
                        </div>
                        `;  
                    }
                }else {
                    rez = '<p style="text-aligen:center">Nothing found</p>';
                }
                $("#search_result").html(rez);
                $btn.removeClass("disabled");
            },
            error: function(err) {
                alert(err.status);
                $btn.removeClass("disabled");
            }
        });
    }
}


/////////////////функция для детальной информации на OMDB////////////////////
function getDetail($lnk) {
    $(".film_detail").hide();
    if (!$lnk.hasClass("done")) {
        if(!$lnk.hasClass("disabled")) {
            $lnk.addClass("disabled");
            $.ajax({
                url: 'https://www.omdbapi.com/?apikey=' + OMDB_KEY + '&i=' + $lnk.data("id"),
                type: 'get',
                dataType: 'json',
                success: function(json) {
                    let rez = `
                        <ul>
                            <li><b>Release data:</b> ${json.Released}</li>
                            <li><b>Rating:</b> ${json.imdbRating}</li>
                            <li><b>Runtime:</b> ${json.Runtime}</li>
                            <li><b>Plot:</b> ${json.Plot}</li>`;  
                        rez += `</ul>`;
                    
                    $lnk.parents(".film_item").find(".film_detail").html(rez);
                    $lnk.parents(".film_item").find(".film_detail").show();
                    $lnk.removeClass("disabled");
                    $lnk.addClass("done");
                },
                error: function(err) {
                    alert(err.status);
                    $lnk.removeClass("disabled");
                }
            });
        }
    } else {
        $lnk.parents(".film_item").find(".film_detail").show();
    }
}



///////// функции для поиска на  https://developers.themoviedb.org/3/ search/search-movies./////////////////

function searchFilms($btn) {
    if (!$btn.hasClass("disabled")) {
        $btn.addClass("disabled");
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' +  $("#search").val(),
            type: 'get',
            dataType: 'json',
            success: function(json) {
                let rez = '',
                    image = '',
                    item;
                if(json.results.length != 0) {
                    for(let i = 0; i < json.results.length; i++) {
                        item = json.results[i];
                        image = (item.poster_path != null) ? 'https://image.tmdb.org/t/p/w500' + item.poster_path : 'https://via.placeholder.com/200x300.png?text=No postetr';
                        rez += `
                        <div class="film_item">
                            <div class="film_poster">
                                <img src="${image}" alt="${item.original_title}">
                            </div>
                            <div class="film_info">
                                <h3>${item.title}</h3>
                                <div><b>Release data:</b> ${item.release_date}</div>
                                <div><b>Rating:</b> ${item.vote_average}</div>
                                <div> ${item.overview}</div>
                                <div class="btn_wrap">
                                    <a href="javascript:void(0)" data-id="${item.id}" onclick="getDetailInfo($(this))" class="btn">Detail info</a>
                                </div>
                            </div>
                            <div class="film_detail"></div>
                        </div>
                        `;
                        
                    }
                    buildPagination(json.page, json.total_pages, json.total_results);
                }else {
                    rez = '<p style="text-aligen:center">Nothing found</p>';
                }
                $("#search_result").html(rez);
                $btn.removeClass("disabled");
            },
            error: function(err) {
                alert(err.status);
                $btn.removeClass("disabled");
            },
            error: function(err) {
                alert(err.status);
                $lnk.removeClass("disabled");
            }
        });
    }
}



///////////////////функция для сайта Movie Data Base для кнопки подробнее //////////////////////////
function getDetailInfo($lnk) {
    $(".film_detail").hide();
    if(!$lnk.hasClass("done")) {
        if(!$lnk.hasClass("disabled")) {
            $lnk.addClass("disabled");
            $.ajax({
                url: 'https://api.themoviedb.org/3/movie/' + $lnk.data("id") + '?api_key=' + API_KEY,
                type: 'get',
                dataType: 'json',
                success: function(json) {
                    let clist = '';
                    for (let c in json.production_countries) {
                        clist += `<li>${json.production_countries[c].name}</li>`;
                    }
    
                    let rez = `
                        <ul>
                            <li><b>Popuarity rate:</b> ${json.popularity}</li>
                            <li><b>Homepage:</b> <a href="${json.homepage}" target="blank">go to homepage</a></li>
                            <li><b>Slogan:</b> ${json.tagline}</li>
                            <li><b>Time:</b> ${json.runtime}</li>
                            <li><b>Status:</b> ${json.status}</li>`;
                        if(json.production_countries.length != 0) {
                            rez += `<li><b>Countries:</b>
                                <ul> ${clist}</ul>
                            </li>`;
                        }
                            
                        rez += `</ul>`;
                    
                    $lnk.parents(".film_item").find(".film_detail").html(rez);
                    $lnk.parents(".film_item").find(".film_detail").show();
                    $lnk.removeClass("disabled");
                    $lnk.addClass("done");
                },
                error: function(err) {
                    alert(err.status);
                    $lnk.removeClass("disabled");
                }
            });
        }
    }else {
        $lnk.parents(".film_item").find(".film_detail").show();
    }
}