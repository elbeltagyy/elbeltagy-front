import React from 'react'
import CreateUserForm from './CreateUserForm'
import BannerIcon from '../ui/BannerIcon'

import { IoIosCreate } from "react-icons/io";
import { lang } from '../../settings/constants/arlang';


function CreateUser() {
  return (
    <div>
      <BannerIcon title={lang.CREATE_USER} icon={<IoIosCreate style={{
        width: '3rem', height: '3rem', color: '#fff'
      }} />} />
      <CreateUserForm />
    </div>
  )
}

// //  edit, delete, content => create, show, taqsima
export default CreateUser
