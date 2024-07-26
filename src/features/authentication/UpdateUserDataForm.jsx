import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import SpinnerMini from "../../ui/SpinnerMini";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useUpdateUser } from "./useUpdateUser";
import UserAvatar from "./UserAvatar";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatar },
    },
  } = useUser();
  const { updateUser, isPending } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName.trim()) return toast.error('fields are required');
    updateUser({ fullName, avatar });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        {currentAvatar && (
          <UserAvatar onlyImage />
        )}
      </FormRow>
      <FormRow>
        <label>Email address</label>
        <Input value={email} disabled />
      </FormRow>
      <FormRow>
        <label htmlFor="fullName">Full name</label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="avatar">Avatar image</label>
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isPending} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isPending}>{isPending && <SpinnerMini />}Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
