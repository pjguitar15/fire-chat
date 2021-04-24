import styled from 'styled-components'

export const ChatForm = styled.input`
  margin: 0;
  width: 100%;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  border: solid 1px #097ff5;
  &:focus {
    outline: none;
  }
`
export const EmojiButton = styled.i`
  color: #097ff5;
  font-size: 25px;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    color: #56aaff;
  }
`
export const EmojiCard = styled.div`
  position: absolute;
  left: -14rem;
  bottom: 3.5rem;
  /* col-lg */
  @media (min-width: 992px) {
    left: -16rem;
    bottom: 3rem;
  }
`
export const ImageUploadButton = styled.i`
  color: #097ff5;
  font-size: 25px;
  margin-top: 5px;
  margin-left: 15px;
  cursor: pointer;
  &:hover {
    color: #56aaff;
  }
`
export const SidebarChatItem = styled.div`
  cursor: pointer;
  margin: 0 10px;
  transition: box-shadow 100ms ease-in-out;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
`
export const SidebarChatWrapper = styled.div`
  height: 16rem;
  max-height: 16rem;
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0ae;

    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    );
  }
`
