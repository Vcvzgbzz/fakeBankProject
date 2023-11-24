import React from 'react'
import { FakeUserResponse } from '../definitions/apiDefinitions'
import { pageStyles } from '../styles/styles'
import { Text, VStack } from './components'
type UserCardProps = {
  user: FakeUserResponse['results'][0]
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div style={pageStyles.cardStyle}>
      <img src={user.picture.large} alt="User" style={imageStyle} />
      <div>
        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
        <VStack>
          <Text>{`${user.gender}, ${user.dob.age} years old`}</Text>
          <Text>{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Phone: {user.phone}</Text>
        </VStack>
      </div>
    </div>
  )
}

const imageStyle: React.CSSProperties = {
  marginRight: '20px',
  borderRadius: '50%',
}

export default UserCard
