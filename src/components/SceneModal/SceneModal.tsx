import Image from 'next/image';

interface SceneModalProps {
  selectedImage: string | null;
  onClose: () => void;
}

const SceneModal: React.FC<SceneModalProps> = ({ selectedImage, onClose }) => {
  const handleClose = () => {
    const dialog = document.getElementById('scene_modal') as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
    onClose();
  };

  return (
    <dialog id="scene_modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog" onSubmit={(e) => e.preventDefault()}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
        </form>
        {selectedImage && (
          <Image
            className="w-full"
            src={`https://image.tmdb.org/t/p/w1280${selectedImage}`}
            alt="Selected Scene"
            width={800}
            height={450}
          />
        )}
      </div>
    </dialog>
  );
};

export default SceneModal;
