suite('Equation View', function() {

    setup(function() {
        this.equationView = new app.views.EquationView({
        });
    });

    test('EquationView should exist - Existence Check', function() {
        expect(this.equationView).to.be.ok;
    });

    test('should have an getValues() method - truthy Check', function() {
        expect(typeof this.equationView.getValues).to.equal('function');
    });

    test('should have an render() method - truthy Check', function() {
        expect(typeof this.equationView.render).to.equal('function');
    });

    test('reformatEquation() should return the mathematically correct string - equal Check', function(done) {
        assert.equal("23*x*x*x*x*x*x*x*x*x*x-2*x*x*x+6",this.equationView.reformatEquation("23x^10-2x^3+6"));
        done();
    });

    test('evaluate() should return the Array of co-ordinates - deepEqual Check', function(done) {
        var data = [{"x":-5,"y":45},{"x":-4,"y":27},{"x":-3,"y":13},{"x":-2,"y":3},{"x":-1,"y":-3},{"x":0,"y":-5},{"x":1,"y":-3},{"x":2,"y":3},{"x":3,"y":13}];
        assert.deepEqual(data,this.equationView.evaluate("2*x*x-5",-5,3));
        // expect(typeof this.equationView.evaluate()).to.equal('Array');
        done();
    });


});

