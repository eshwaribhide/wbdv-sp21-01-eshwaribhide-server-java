var $usernameFld
var $passwordFld
var $firstNameFld
var $lastNameFld
var $roleFld
var $createBtn
var theTableBody
var $updateBtn
var userService = new UserServiceClient()

var users = [];

function createUser(user) {
  userService.createUser(user)
    .then(function (actualUser) {
      users.push(actualUser)
      renderUsers(users)
    })
}

var selectedUser = null
function selectUser(event) {
  var selectBtn = jQuery(event.target)
  var theId = selectBtn.attr("id")
  selectedUser = users.find(user => user._id === theId)
  $usernameFld.val(selectedUser.username)
  $passwordFld.val(selectedUser.password)
  $firstNameFld.val(selectedUser.firstName)
  $lastNameFld.val(selectedUser.lastName)
  $roleFld.val(selectedUser.role)
}

function deleteUser(event) {
    console.log(event.target)
    var deleteBtn = jQuery(event.target)
    var theClass = deleteBtn.attr("class")
    var theIndex = deleteBtn.attr("id")
    var theId = users[theIndex]._id

    userService.deleteUser(theId)
      .then(function (status) {
        users.splice(theIndex, 1)
        renderUsers(users)
      })
}

function renderUsers(users) {
  theTableBody.empty()
  for (var i = 0; i < users.length; i++) {
    var user = users[i]
    theTableBody
      .prepend(`
    <tr>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.role}</td>
        <td>
            <i class="fa-2x fa fa-times wbdv-delete" id="${i}"></i>
            <i class="fa-2x fa fa-pencil-alt wbdv-select" id="${user._id}></i>
        </td>
    </tr>
  `)
  }
  jQuery(".wbdv-delete")
    .click(deleteUser)
  jQuery(".wbdv-select")
    .click(selectUser)
}

function updateUser() {
  console.log(selectedUser)
  selectedUser.username = $usernameFld.val()
  selectedUser.password = $passwordFld.val()
  selectedUser.password = $firstNameFld.val()
  selectedUser.password = $lastNameFld.val()
  selectedUser.semester = $roleFld.val()
  userService.updateUser(selectedUser._id, selectedUser)
    .then(function (status) {
      var index = users.findIndex(user => user._id === selectedUser._id)
      users[index] = selectedUser
      renderUsers(users)
    })
}

function main() {
  $usernameFld = $(".wbdv-username-fld")
  $passwordFld = $(".wbdv-password-fld")
  $firstNameFld = $(".wbdv-firstName-fld")
  $lastNameFld = $(".wbdv-lastName-fld")
  $roleFld = $(".wbdv-role-fld")
  $createIcon = $(".wbdv-create")
  $updateIcon = $(".wbdv-update")
  theTableBody = jQuery("tbody")

  $updateIcon.click(updateUser)
  $createIcon.click(() => {
      createUser({
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val()
      })
      $usernameFld.val("")
      $passwordFld.val("")
      $firstNameFld.val("")
      $lastNameFld.val("")
    }
  )

  userService.findAllUsers()
    .then(function (actualUsersFromServer) {
      users = actualUsersFromServer
      renderUsers(users)
    })
}
jQuery(main)