/**
 * AuthForm component for handling user authentication.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleSubmit - The function to handle form submission.
 * @param {string} props.name - The user's name.
 * @param {Function} props.setName - The function to update the user's name.
 * @param {string} props.email - The user's email address.
 * @param {Function} props.setEmail - The function to update the user's email address.
 * @param {string} props.password - The user's password.
 * @param {Function} props.setPassword - The function to update the user's password.
 * @param {string} props.secret - The user's secret answer.
 * @param {Function} props.setSecret - The function to update the user's secret answer.
 * @param {string} props.page - The current page of the form.
 * @returns {JSX.Element} The rendered AuthForm component.
 */
const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  page,
}) => (
  <form onSubmit={handleSubmit}>
    {page !== "login" && (
      <div className="form-group p-2">
        <small>
          <label className="text-muted">Your name</label>
        </small>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter name"
        />
      </div>
    )}

    <div className="form-group p-2">
      <small>
        <label className="text-muted">Email address</label>
      </small>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="form-control"
        placeholder="Enter email address"
      />
    </div>

    <div className="form-group p-2">
      <small>
        <label className="text-muted">Password</label>
      </small>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="form-control"
        placeholder="Enter password"
      />
    </div>

    {page !== "login" && (
      <>
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Pick a question</label>
          </small>
          <select className="form-control">
            <option>What is your favourite color?</option>
            <option>What is your best friend's name?</option>
            <option>What city you were born?</option>
          </select>

          <small className="form-text text-muted">
            You can use this to reset your password if forgotten.
          </small>
        </div>

        <div className="form-group p-2">
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Write your answer here"
          />
        </div>
      </>
    )}

    <div className="form-group p-2 mt-2 text-center">
      <button
        disabled={
          page === "login"
            ? !email || !password
            : !name || !email || !secret || !password
        }
        className="btn btn-primary col-6"
      >
        Submit
      </button>
    </div>
  </form>
);

export default AuthForm;