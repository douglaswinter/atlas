import { render, screen } from "@testing-library/react";
import { NumberInput } from "./NumberInput";
import userEvent from "@testing-library/user-event";

describe("NumberInput", () => {
  it("default value is marked invalid", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" defaultValue={-5} />,
    );

    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("default value is marked valid", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" defaultValue={5} />,
    );

    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("does not accept negative numbers in natural mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" defaultValue={1} />,
    );

    const numberInput = screen.getByLabelText("numberbox");

    const user = userEvent.setup();
    await user.clear(numberInput);
    await user.type(numberInput, "-5");

    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("accepts positive numbers in natural mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" defaultValue={1} />,
    );

    const numberInput = screen.getByLabelText("numberbox");

    const user = userEvent.setup();
    await user.clear(numberInput);
    await user.type(numberInput, "5");

    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("does not accept decimal numbers in integer mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="integer" defaultValue={0} />,
    );

    const numberInput = screen.getByLabelText("numberbox");

    const user = userEvent.setup();
    await user.clear(numberInput);
    await user.type(numberInput, "-5.2");

    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("accepts negative numbers in integer mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="integer" defaultValue={0} />,
    );

    const numberInput = screen.getByLabelText("numberbox");

    const user = userEvent.setup();
    await user.clear(numberInput);
    await user.type(numberInput, "-5");

    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("does not accept scientific numbers in floating mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="floating" defaultValue={0} />,
    );

    const numberInput = screen.getByLabelText("numberbox");

    const user = userEvent.setup();
    await user.clear(numberInput);
    await user.type(numberInput, "-5e5");

    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("accepts decimal numbers in floating mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="floating" defaultValue={0} />,
    );

    const numberInput = screen.getByLabelText("numberbox");

    const user = userEvent.setup();
    await user.clear(numberInput);
    await user.type(numberInput, "-5.2");

    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("does not accept non-number characters in scientific mode", async () => {
    render(
      <NumberInput
        label="numberbox"
        numberMode="scientific"
        defaultValue={0}
      />,
    );

    const numberInput = screen.getByLabelText("numberbox");

    const user = userEvent.setup();
    await user.clear(numberInput);
    await user.type(numberInput, "-5e5!");

    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("accepts scientific numbers in scientific mode", async () => {
    render(
      <NumberInput
        label="numberbox"
        numberMode="scientific"
        defaultValue={0}
      />,
    );

    const numberInput = screen.getByLabelText("numberbox");

    const user = userEvent.setup();
    await user.clear(numberInput);
    await user.type(numberInput, "5e5");

    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });
});
