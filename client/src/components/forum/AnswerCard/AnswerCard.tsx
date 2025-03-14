import React from 'react';
import styled from 'styled-components';
import timeIcon from '../../../../public/images/time.svg';
import likeIcon from '../../../../public/images/like.svg';
import starIcon from '../../../../public/images/star.svg';
import Image from 'next/image';

const AnswerCard = ({ bestAnswer = 'false' }: { bestAnswer?: string }) => {
  return (
    <CardWrapper>
      {bestAnswer === 'true' && (
        <StarButton>
          <Image src={starIcon} alt="Résolu" />
        </StarButton>
      )}
      <Card $solved={bestAnswer}>
        {bestAnswer === 'true' && (
          <ResolutionBadge>Meilleure réponse</ResolutionBadge>
        )}
        <div>
          <UserAvatar />
        </div>
        <AnswerContainer>
          <AnswerHeader>
            <div>
              <Pseudo>polakotekk</Pseudo>
              <Role>Élève</Role>
            </div>
            <AnswerInfos>
              <AnswerDate>
                <Image src={timeIcon} alt="time" /> Il y a 2 jours
              </AnswerDate>
              <AnswerLikes>
                <Image src={likeIcon} alt="likes" /> 12
              </AnswerLikes>
            </AnswerInfos>
          </AnswerHeader>
          <div>
            <AnswerContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id laborum.
            </AnswerContent>
          </div>
        </AnswerContainer>
      </Card>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  width: 90%;
`;

const StarButton = styled.div`
  position: absolute;
  left: -15px;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  background-color: #292b48;
  z-index: 1000;
  border: 1px solid #2cad72;
  transform: translateY(-50%);
  border-radius: 7px;
`;

const Card = styled.div<{ $solved: string }>`
  width: 100%;
  background-color: #22233a;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$solved === 'true' ? '#2CAD72' : '#606060')};
  padding: 1.2rem 1.4rem;
  color: #e4e4e4;
  display: flex;
  position: relative;
`;

const ResolutionBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #292b48;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 3rem;
  border-radius: 6px;
  border: 0.5px solid #2cad72;
`;

const UserAvatar = styled.div`
  background-color: red;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 0.3rem;

  img {
    margin-right: 0.5rem;
  }
`;

const Pseudo = styled.p`
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const Role = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
`;

const AnswerInfos = styled.div`
  display: flex;
`;

const AnswerDate = styled.p`
  margin-right: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: start;
`;

const AnswerLikes = styled(AnswerDate)`
  margin-right: 0;
`;

const AnswerContent = styled.p`
  font-size: 0.9rem;
  line-height: 1.5rem;
`;

export default AnswerCard;
