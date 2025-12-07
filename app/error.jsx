"use client";

export default function ErrorPage({ error }) {
  return (
    <>
      <h1>An error occured!</h1>
      <h2>{error}</h2>
    </>
  );
}
