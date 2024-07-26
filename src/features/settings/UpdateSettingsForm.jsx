import styled from "styled-components";
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import { useSettings } from './useSettings'
import { useEffect, useState } from "react";
import { useUpdateSettings } from "./useUpdateSettings";

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

function UpdateSettingsForm() {

  const { settings, isLoading } = useSettings();
  const { updateSettings, isPending: isUpdating } = useUpdateSettings();
  const [breakfastPrice, setBreakfastPrice] = useState('');
  const [maxBookingLength, setMaxBookingLength] = useState('');
  const [minBookingLength, setMinBookingLength] = useState('');
  const [maxGuestsPerBooking, setMaxGuestsPerBooking] = useState('');

  useEffect(() => {
    if (settings) {
      setBreakfastPrice(settings?.breakfastPrice || '');
      setMaxBookingLength(settings?.maxBookingLength || '');
      setMinBookingLength(settings?.minBookingLength || '');
      setMaxGuestsPerBooking(settings?.maxGuestsPerBooking || '');
    }
  }, [settings]);

  function changeSettings(type) {
    switch (type) {
      case 'min-nights': {
        updateSettings({
          minBookingLength
        });
        break;
      }
      case 'max-nights': {
        updateSettings({
          maxBookingLength
        });
        break;
      }
      case 'max-guests': {
        updateSettings({
          maxGuestsPerBooking
        });
        break;
      }
      case 'breakfast-price': {
        updateSettings({
          breakfastPrice
        });
        break;
      }
    }
  }

  return (
    <Form>
      <FormRow>
        <label htmlFor="min-nights">Minimum nights/booking</label>
        <Input
          type='number'
          id='min-nights'
          onChange={e => setMinBookingLength(e.target.value)}
          onBlur={() => changeSettings('min-nights')}
          value={minBookingLength}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="max-nights">Maximum nights/booking</label>
        <Input
          type='number'
          id='max-nights'
          onChange={e => setMaxBookingLength(e.target.value)}
          onBlur={() => changeSettings('max-nights')}
          value={maxBookingLength}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="max-guests">Maximum guests/booking</label>
        <Input
          type='number'
          id='max-guests'
          onChange={e => setMaxGuestsPerBooking(e.target.value)}
          onBlur={() => changeSettings('max-guests')}
          value={maxGuestsPerBooking}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="breakfast-price">Breakfast price</label>
        <Input
          type='number'
          id='breakfast-price'
          onChange={e => setBreakfastPrice(e.target.value)}
          onBlur={() => changeSettings('breakfast-price')}
          value={breakfastPrice}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        {(isLoading || isUpdating) && <SpinnerMini />}
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
