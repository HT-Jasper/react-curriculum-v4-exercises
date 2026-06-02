import { useContext, useEffect, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  const { state, dispatch } = useContext(SurveyContext);
  const isEditing = state.ui.editingQuestionId === question.id;
  const [workingText, setWorkingText] = useState(question.question);
  const [optionDrafts, setOptionDrafts] = useState(question.options);

  useEffect(() => {
    setWorkingText(question.question);
    setOptionDrafts(question.options);
  }, [question.question, question.options]);

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
      setWorkingText(question.question);
      setOptionDrafts(question.options);
    } else {
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: question.id },
      });
    }
  };

  const handleSave = () => {
    const newText = workingText.trim();

    if (!newText) {
      return;
    }

    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { id: question.id, newText },
    });
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
  };

  const handleCancel = () => {
    setWorkingText(question.question);
    setOptionDrafts(question.options);
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch({ type: 'DELETE_QUESTION', payload: { id: question.id } });
    }
  };

  const handleOptionDraftChange = (index, value) => {
    setOptionDrafts(
      optionDrafts.map((option, optionIndex) =>
        optionIndex === index ? value : option
      )
    );
  };

  const handleOptionSave = (index) => {
    const newText = optionDrafts[index].trim();

    if (!newText) {
      return;
    }

    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText,
      },
    });
  };

  const handleOptionDelete = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { questionId: question.id, optionIndex: index },
    });
  };

  const handleAddOption = () => {
    const optionText = window.prompt('Enter new option text:');

    if (optionText && optionText.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: { questionId: question.id, optionText: optionText.trim() },
      });
    }
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <>
            <textarea
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
              className={styles['question-input']}
              rows={3}
            />
            <div className={styles['question-actions']}>
              <button
                className={styles['save-btn']}
                onClick={handleSave}
                disabled={!workingText.trim()}
              >
                Save
              </button>
              <button className={styles['cancel-btn']} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={optionDrafts[index] ?? option}
                      onChange={(e) =>
                        handleOptionDraftChange(index, e.target.value)
                      }
                      className={styles['option-input']}
                    />
                    <div className={styles['option-actions']}>
                      <button
                        className={styles['option-edit-btn']}
                        onClick={() => handleOptionSave(index)}
                        disabled={!optionDrafts[index]?.trim()}
                      >
                        Save
                      </button>
                      <button
                        className={styles['option-delete-btn']}
                        onClick={() => handleOptionDelete(index)}
                        disabled={question.options.length <= 2}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>

          {isEditing && (
            <button
              className={styles['add-option-btn']}
              onClick={handleAddOption}
            >
              + Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
