import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useAuth } from '../../../common/context/Auth/useAuth';
import { commentsSelectors, removeCommentById, selectCommentDeliting } from '../commentsSlice';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import { selectProfile } from '../../profile/profileSlice';
import SpinnerIcon from '../../../components/icons/SpinnerIcon';

const StyledDelete = styled.div`
  cursor: pointer;
  opacity: 0;
`;

export const DeleteAction = ({ commentId }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { REACT_APP_FEATURE_DELETE_COMMENT } = process.env;

  const profile = useSelector(selectProfile);
  const deletingComments = useSelector(selectCommentDeliting);
  const comment = useSelector((state) => commentsSelectors.selectById(state, commentId));

  const handleToggleDelete = () => {
    dispatch(removeCommentById({ questionId: comment.questionId, commentId }));
  };

  const isDeliting = useMemo(
    () => deletingComments.find((id) => id.commentId === comment._id),
    [deletingComments, comment]
  );

  if (!REACT_APP_FEATURE_DELETE_COMMENT || !token || !profile.isAdmin) return null;

  return (
    <div aria-hidden onClick={handleToggleDelete}>
      <StyledDelete className="delete">
        {isDeliting ? <SpinnerIcon /> : <DeleteIcon />}
      </StyledDelete>
    </div>
  );
};

DeleteAction.propTypes = {
  commentId: PropTypes.string.isRequired,
};