import styles from './SnackForm.module.css';
import { useEffect, useState } from 'react';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const isEditing = Boolean(editingSnack);

  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });

  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name);
      setRating(editingSnack.rating);
      setTouched({ name: false, rating: false });
    } else {
      setName('');
      setRating('');
      setTouched({ name: false, rating: false });
    }
  }, [editingSnack]);

  function validateName() {
    return name.trim() !== '';
  }

  function validateRating() {
    return Number(rating) !== '';
  }

  function getNameError() {
    return !validateName() && touched.name ? 'Snack name is required' : '';
  }

  const nameError = getNameError();

  function getRatingError() {
    return !validateRating() && touched.rating ? 'Please select a rating' : '';
  }

  const ratingError = getRatingError();

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, rating: true });
    if (!validateName() || !validateRating()) return;
    onSave({ name: name.trim(), rating: Number(rating) });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setTouched({ name: true, rating: true });

    if (!validateName() || !validateRating()) {
      return;
    }

    const payload = {
      name: name.trim(),
      rating: Number(rating),
    };

    if (isEditing) {
      updateSnack(editingSnack.id, payload.name, payload.rating);
    } else {
      addSnack(payload.name, payload.rating);
      setName('');
      setRating('');
      setTouched({ name: false, rating: false });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          required
          className={styles['field-input']}
          placeholder="Enter snack name"
        />
        {nameError ? <div className={styles.error}>{nameError}</div> : null}
      </div>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          min="1"
          max="5"
          className={styles['field-input']}
          placeholder="Rate 1-5"
        />
        {ratingError ? <div className={styles.error}>{ratingError}</div> : null}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
