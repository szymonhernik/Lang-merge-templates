export default function Photocredits({ profilePicture }) {
  return (
    <>
      {profilePicture && (
        <p className="text-center">
          Photo by{' '}
          {profilePicture.collaboratorUrl ? (
            <a
              href={profilePicture.collaboratorUrl}
              target="_blank"
              className="underline"
            >
              {profilePicture.displayName}
            </a>
          ) : (
            <span>{profilePicture.displayName}</span>
          )}
        </p>
      )}
    </>
  )
}
