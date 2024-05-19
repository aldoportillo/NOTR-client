import React from 'react';
import DefaultImage from '../assets/notr-logo-medium-transparent.png';
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi';
import { BsGenderAmbiguous } from 'react-icons/bs';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/User';
import useFriendRequest from '../hooks/useFriendRequest';

function UserInfo({ profileUser }: { profileUser: User }) {
    const { _id, firstName, lastName, height, weight, sex, friends, dob, username } = profileUser;
    console.log(_id)
    const { auth, logout } = useAuth();
    const {sendFriendRequest} = useFriendRequest();

    const getAge = () => {
        const dobDate = new Date(dob);
        const diff = Date.now() - dobDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
        <Wrapper>
            <ProfileSection>
                <ProfileImageContainer>
                    <img src={DefaultImage} alt="Profile" />
                </ProfileImageContainer>
                <Name>{firstName} {lastName}</Name>
            </ProfileSection>
            <InfoSection>
                <InfoRow><GiBodyHeight /> {Math.floor(height / 12)} ft {height % 12} in</InfoRow>
                <InfoRow><GiWeightScale /> {weight} lbs</InfoRow>
                <InfoRow><BsGenderAmbiguous /> {sex} {getAge()} years</InfoRow>
                <InfoRow>Friends: {friends.length}</InfoRow>
            </InfoSection>
            <Actions>
                {!username || username === auth.user?.username ? (
                    <LogoutButton onClick={logout}>Logout</LogoutButton>
                ) : <LogoutButton onClick={() => sendFriendRequest(_id)}>Add Friend</LogoutButton>}
            </Actions>
        </Wrapper>
    );
}

export default UserInfo;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    background-color: var(--header);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 960px;
    margin: 20px auto;
`;

const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`;

const ProfileImageContainer = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 10px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Name = styled.h2`
    font-size: 1.5rem;
    color: var(--accent);
    font-weight: bold;
    text-align: center;
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 2;
    padding-left: 20px;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin: 5px 0;
    svg {
        margin-right: 8px;
    }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 1;
`;

const LogoutButton = styled.button`
    padding: 10px 20px;
    background: var(--accent);
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
        background: var(--toastify-color-progress-dark);
    }
`;
