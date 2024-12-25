<div className="container_form">
  <div className="grid_input">
    <form onSubmit={handleSubmit}>
      <div className="div-border">
        <h2>ชื่อ - นามสกุล</h2>
        <div className="input_right_container">
          <div className="textarea_input_right">
            <textarea
              value={formdata.SName.fullname}
              name="fullname"
              onChange={handle_text}
              placeholder="ชื่อ - นามสกุล"/>
          </div>
          {checkbox_undername ? (
            <>
              <div className="textarea_input_right">
                <textarea
                  value={formdata.SUndername.under_name}
                  name="under_name"
                  onChange={handle_text}
                  placeholder="การปักใต้ชื่อ"/>
              </div>
              </>
          ) : ("")}
        </div>
      </div>
      <div className="button-container">
        <button type="submit" className="submit-button">ส่งข้อมูล</button>
      </div>
    </form>
  </div>
</div>
