export default function BorderColorChange(props) {
const {noteId } = props

        return (
          <div className='MK-colors-holder flex space-around' >
                <span className="MK-blue" onClick={()=> props.setColor('#1f5d8e' , noteId)}></span>
                <span className="MK-red" onClick={()=> props.setColor('#842d2d' , noteId)}></span>
                <span className="MK-green" onClick={()=> props.setColor('#296c2c' , noteId)}></span>
                <span className="MK-yellow" onClick={()=> props.setColor('#ebe487' , noteId)}></span>
                <span className="MK-none" onClick={()=> props.setColor('#6e6e6e' , noteId)}></span>
            </div>
        )
}
