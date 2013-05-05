suite('Equation View', function() {

    setup(function() {
        this.equationView = new app.views.EquationView({
        });
    });

    test('EquationView should exist', function() {
        expect(this.equationView).to.be.ok;
    });

    test('should have an getValues() method', function() {
        expect(typeof this.equationView.getValues).to.equal('function');
    });

    test('should have an evaluate() method', function() {
        expect(typeof this.equationView.evaluate).to.equal('function');
    });

    test('should have an reformatEquation() method', function() {
        expect(typeof this.equationView.reformatEquation).to.equal('function');
    });

    test('should have an graphDisplay() method', function() {
        expect(typeof this.equationView.graphDisplay).to.equal('function');
    });

    test('should have an render() method', function() {
        expect(typeof this.equationView.render).to.equal('function');
    });

    test('reformatEquation should return the mathematically correct string', function(done) {
        assert.equal(5, reformatEquation(2,3));
        done();
    });


});

