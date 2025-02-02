app.post('/signup', (req, res) => {
    const { firstname, lastname, email, password, gender, date, month, year } = req.body;

    const query = 'INSERT INTO users (firstname, lastname, email, password, gender, day, month, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [firstname, lastname, email, password, gender, date, month, year], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error inserting user: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'Account created successfully!' });
    });
});


