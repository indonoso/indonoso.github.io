function setWindowHeight() {
    var windowHeight = window.innerHeight;
    document.getElementsByTagName('body')[0].style.height = windowHeight + "px";
    console.log(document.body.style.height);
}

function loadDatesCity(dates_, city_) {
    var left = document.createElement("div");
    left.setAttribute('class', 'col-md-2');
    var dates = document.createElement("p");
    dates.setAttribute('class', 'dates')
    dates.appendChild(document.createTextNode(dates_))
    var city = document.createElement("p");
    city.appendChild(document.createTextNode(city_))
    city.setAttribute('class', 'city')
    left.appendChild(dates)
    left.appendChild(city)
    return left
}

function loadExperience(div, contentInfo, _type) {
    for (var i = 0; i < contentInfo.length; i++) {

        var row = document.createElement("div");
        row.setAttribute('class', 'row');
        div.appendChild(row)

        // Fecha y ciudad
        var left = loadDatesCity(contentInfo[i]['dates'], contentInfo[i]['city'])
        var right = document.createElement("div");
        right.setAttribute('class', 'col-md-10');
        if (_type) {
            // Contenido
            var what = document.createElement("h4");
            what.setAttribute('class', 'what')
            what.innerHTML = contentInfo[i]['what']
            var where = document.createElement("p");
            where.setAttribute('class', 'where')
            where.innerHTML = contentInfo[i]['where']
            var extra = document.createElement("p");
            extra.innerHTML = contentInfo[i]['relevant_classes']
            right.appendChild(what)
            right.appendChild(where)
            right.appendChild(extra)
        } else {
            var what = document.createElement("h4");
            what.setAttribute('class', 'what')
            what.innerHTML = contentInfo[i]['what']
            var where = document.createElement("p");
            where.setAttribute('class', 'where')
            where.innerHTML = contentInfo[i]['where']
            right.appendChild(what)
            right.appendChild(where)
            if (contentInfo[i]['activities'].length > 0) {
                var extra = document.createElement("p");
                extra.innerHTML = contentInfo[i]['activities']
                extra.setAttribute('class', 'extra')
                right.appendChild(extra)
            }


            if (contentInfo[i]['bullet_points'].length > 0) {
                var bullet = document.createElement("ul")
                for (var j = 0; j < contentInfo[i]['bullet_points'].length; j++) {
                    var li = document.createElement("li")
                    li.innerHTML = contentInfo[i]['bullet_points'][j]
                    bullet.appendChild(li)
                }
                right.appendChild(bullet)
            }


        }

        row.appendChild(left)
        row.appendChild(right)

    }
}

function loadOther(div, contentInfo) {
    var title = document.createElement("h4")
    title.innerHTML = "Activities"
    var row = document.createElement("div");
    row.setAttribute('class', 'row');
    div.appendChild(row)
    var content = document.createElement("div");
    content.setAttribute('class', 'col-md-12');
    row.appendChild(content)
    content.appendChild(title)
    var ul = document.createElement("ul")
    last_index = contentInfo.length - 1
    for (var i = 0; i < last_index; i++) {
        var li = document.createElement("li")
        li.innerHTML = contentInfo[i]
        ul.appendChild(li)
    }
    content.appendChild(ul)
    var other_interests = document.createElement("h4")
    other_interests.innerHTML = "Non-Academic interests"
    content.appendChild(other_interests)
    for (var key in contentInfo[last_index]) {
        var title = document.createElement("h5")
        title.innerHTML = key
        var explanation = document.createElement("p")
        explanation.innerHTML = contentInfo[last_index][key]
        content.appendChild(title)
        content.appendChild(explanation)
    }
}

function loadLanguages(contentInfo, div) {
    for (var key in contentInfo) {
        var title = document.createElement("h5")
        title.innerHTML = key
        div.appendChild(title)
        if (contentInfo[key].length > 0) {
            var ul = document.createElement("ul")

            for (var i = 0; i < contentInfo[key].length; i++) {
                var li = document.createElement("li")
                li.innerHTML = contentInfo[key][i]
                ul.appendChild(li)
            }

            div.appendChild(ul)
        }
    }
}

function loadData(){
    let current_info = info['en']
     for (let key in current_info) {
        let _type = key == "education" ? true : false
        let div = document.getElementById(key);
        let contentInfo = current_info[key]
        if (key == "skills") {
            div = document.getElementById("languages")
            loadLanguages(contentInfo['languages'], div)
        } else if (['education', 'working', 'research'].indexOf(key) != -1) {
            loadExperience(div, contentInfo, _type)
        } else if (key == "other_activities") {
            loadOther(div, contentInfo)

        }
    }
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    window.dispatchEvent(new Event('resize'));
})

$('document').ready(function () {
    loadData()

})
