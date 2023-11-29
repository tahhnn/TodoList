export function SelectPriority({ handleAdd }: any) {
    return (
        <select name='priority' onChange={handleAdd}>
            <option value='' disabled selected hidden>
                Chọn độ khó
            </option>
            <option value='Dễ'>Dễ</option>
            <option value='Trung bình'>Trung bình</option>
            <option value='Khó'>Khó</option>
        </select>
    )
}
