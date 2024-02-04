var form = document.getElementById("myForm"),
    userName = document.getElementById("name"),
    category = document.getElementById("category"),
    Initial_Stock = document.getElementById("inst"),
    Stock_Received = document.getElementById("strev"),
    iDate = document.getElementById("iDate"),
    post = document.getElementById("minst"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    form.reset()
})

submitBtn.addEventListener('click', ()=> {
    Notification.requestPermission().then(perm =>{
        if(perm === "granted"){
           
                const notification = new Notification("Stocks are low",{
                    body: "Place order"
                }) 
            
           
        }
    })
   
})

function showInfo(){
    document.querySelectorAll('.itemDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="itemDetails">
            <td>${index+1}</td>
            
            <td>${element.itemName}</td>
            <td>${element.itemCategory}</td>
            <td>${element.itemInitial_Stock}</td>
            <td>${element.itemStock_Received}</td>
            <td>${element.itemDate}</td>
            <td>${element.itemMinimum_Stock}</td>
            <td>${element.startDate}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.itemName}', '${element.itemCategory}', '${element.itemInitial_Stock}', '${element.itemStock_Received}', '${element.itemDate}', '${element.itemMinimum_Stock}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.itemName}', '${element.itemCategory}', '${element.itemInitial_Stock}', '${element.itemStock_Received}', '${element.itemDate}', '${element.itemMinimum_Stock}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(name, category, inst, strev, iDate, minst, sDate){
    
    document.querySelector('#showName').value = name,
    document.querySelector("#showCat").value = category,
    document.querySelector("#showInst").value = inst,
    document.querySelector("#showStrev").value = strev,
    document.querySelector("#showIdate").value = iDate,
    document.querySelector("#showMin").value = minst,
    document.querySelector("#showsDate").value = sDate
}
if(document.querySelector("#showStrev").value < 3){
    const notification = new Notification("Stock almost over",{
        body: "Place an order soon"
    })
}


function editInfo(name, category, inst, strev, iDate, minst, sDate){
    isEdit = true
    editId = index
    
    userName.value = name
    category.value = category,
    inst.value = inst,
    strev.value = strev,
    iDate.value = iDate,
    minst.value = minst,
    sDate.value = sDate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        
        itemName: userName.value,
        itemCategory: category.value,
        itemInitial_Stock: inst.value,
        itemStock_Received: strev.value,
        itemDate: iDate.value,
        itemMinimum_Stock: minst.value,
        startDate: sDate.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

     

    
})