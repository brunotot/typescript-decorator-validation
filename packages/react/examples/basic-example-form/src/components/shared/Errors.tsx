export type ErrorsProps = {
  errors: string[];
};

/**
 * A sample errors container.
 */
export default function Errors({ errors }: ErrorsProps) {
  return (
    <>
      {/* 
          Try returning this block of code instead to see how to limit the amount of error messages being displayed to one. 
        */}
      {/*{errors.testEmail?.length > 0 && (
            <span
              style={{
                lineHeight: 1.15,
                color: "darkred",
                textAlign: "left",
                fontSize: 12,
              }}
            >
              {errors.testEmail[0]}
            </span>
            )}*/}
      {errors?.length > 0 && (
        <ul
          style={{
            padding: 0,
            paddingLeft: 26,
            margin: 0,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          {errors.map((msg) => (
            <li
              key={msg}
              style={{
                lineHeight: 1.15,
                color: "red",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {msg}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
