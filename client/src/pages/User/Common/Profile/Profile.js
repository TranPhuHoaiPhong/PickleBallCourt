import React from 'react'
import ProfileComponent from '../../../../components/UserComponent/PickleBallCourt/ProfileComponent/ProfileComponent'
import HeaderComponent from '../../../../components/UserComponent/PickleBallCourt/HeaderPickleComponent/HeaderPickleComponent'

const Profile = () => {
  return (
    <div>
        <HeaderComponent/>
        <div style={{ marginTop: "100px", maxWidth: "700px", marginLeft: "auto", 
  marginRight: "auto"}}>
          <ProfileComponent/>
        </div>
    </div>
  )
}

export default Profile

