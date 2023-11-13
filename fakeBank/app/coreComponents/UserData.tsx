import React from 'react'
import { FakeUserResponse } from '../definitions/apiDefinitions'

type UserCardProps = {
  user: FakeUserResponse['results'][0]
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div style={cardStyle}>
      <img src={user.picture.large} alt="User" style={imageStyle} />
      <div>
        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
        <p>{`${user.gender}, ${user.dob.age} years old`}</p>
        <p>{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  margin: '10px',
}

const imageStyle: React.CSSProperties = {
  marginRight: '20px',
  borderRadius: '50%',
}

export default UserCard
