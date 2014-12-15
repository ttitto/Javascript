define(["notify", 'Controller', 'Mustache'],
    function (notify, Controller, Mustache) {
        var note = $('#notes').notify(),
            self,
            ProductController = (function () {
                function ProductController(dataRepo) {
                    self = this;
                    Controller.call(this, dataRepo);
                }

                ProductController.prototype = Object.create(Controller.prototype);
                ProductController.prototype.constructor = this;

                ProductController.prototype.loadAddProductForm = function loadAddProductForm(selector) {
                    $(selector).load('templates/addProductForm.html');
                };

                ProductController.prototype.loadProducts = function loadProducts(selector) {
                    this.getDataRepo().products.loadProducts()
                        .then(
                        function loadProductsSuccess(productsData) {

//                            var loggedUser = self.getLoggedUser().userId;
//                            var ifelseObj = {
//                                loggeduser: loggedUser,
//
//                                ifelse: function () {
//                                    return function (text, render) {
//                                        if (render(text) === loggedUser) {
//                                            return $.get('templates/productFooter.html', function (template) {
//                                                return template;
//                                            });
//                                        }
//                                        else {
//                                            return '';
//                                        }
//                                    }
//                                }
//                            };
//                            $.extend(productsData, ifelseObj);

                            $.get('templates/productsList.html', function (template) {
                                var allProductsHtml = Mustache.render(template, productsData);
                                $(selector).html(allProductsHtml);

                            });

                            $.get('templates/filtersForm.html', function (template) {
                                self.getDataRepo().products.loadProducts()
                                    .then(
                                    function (productData) {
                                        var output = Mustache.render(template, productData);
                                        $(selector).prepend(output);
                                    },
                                    function error(err) {
                                       console.log(err.responseText);
                                    }
                                )

                            });
                            note.successMessage('Your products were loaded successfully');

                        },
                        function loadProductsError(err) {
                            note.errorMessage('', 'We couldn\'t load the products!');
                            console.log(err.responseText);
                        }
                    );
                };

                ProductController.prototype.attachEventHandlers = function attachEventHandlers() {
                    Controller.prototype.attachEventHandlers.call(this);
                    attachAddProductHandler.call(this, '#main');
                    attachEditProductHandler.call(this, '#main');
                    attachDeleteProductHandler.call(this, '#main');
                    attachDeleteProductFromBase.call(this, '#main');
                    attachEditProductFromBase.call(this, '#main');
                };

                var attachAddProductHandler = function attachAddProductHandler(selector) {
                    var _this = this;

                    $(selector).on('click', '#add-product-button', function () {
                        var name = $('#name').val(),
                            category = $('#category').val(),
                            price = $('#price').val(),
                            user = self.getLoggedUser().userId,
                            product = {
                                name: name,
                                category: category,
                                price: price,
                                userId: JSON.parse(self.getDataRepo().baas.getPointerString('_User', user)),
                                "ACL": JSON.parse(self.getDataRepo().baas.getAcl(user))
                            };

                        self.getDataRepo().products.addProduct(product)
                            .then(
                            function (productAdditionData) {
                                note.successMessage('Product added successfully');
                                window.location = '#/products';
                            },
                            function (err) {
                                note.errorMessage('Product couldn\'t be created');
                                console.log(err.responseText);
                            }
                        );
                    });
                };

                var attachEditProductHandler = function attachEditProductHandler(selector) {

                    $(selector).on('click', '.edit-button', function (ev) {
                        var productId = $(ev.target).attr('data-id');
                        self.getDataRepo().products.getProductById(productId)
                            .then(
                            function success(productData) {
                                $.get('templates/editProductForm.html', function (template) {
                                    var output = Mustache.render(template, productData);
                                    $(selector).html(output);
                                });
                            },
                            function error(err) {
                                note.errorMessage('', 'The requested product couldn\'t be loaded');
                                console.log(err.responseText);
                            }
                        );
                    });
                };

                var attachDeleteProductHandler = function attachDeleteProductHandler(selector) {

                    $(selector).on('click', '.delete-button', function (ev) {
                        var productId = $(ev.target).attr('data-id');
                        self.getDataRepo().products.getProductById(productId)
                            .then(
                            function success(productData) {
                                $.get('templates/deleteProductForm.html', function (template) {
                                    var output = Mustache.render(template, productData);
                                    $(selector).html(output);
                                });
                            },
                            function error(err) {
                                note.errorMessage('', 'The requested product couldn\'t be loaded');
                                console.log(err.responseText);
                            }
                        );
                    });
                };

                var attachDeleteProductFromBase = function attachDeleteProductFromBase(selector) {
                    $(selector).on('click', '#delete-product-button', function (ev) {
                        var productId = $(ev.target).attr('data-id');
                        self.getDataRepo().products.deleteProduct(productId)
                            .then(
                            function deletionSuccess() {
                                note.successMessage('The product was successfully deleted.');
                                window.location = '#/products';
                            },
                            function deletionError(err) {
                                note.errorMessage('', 'The product couldn\'t be deleted.');
                                console.log(err.responseText);
                            }
                        );
                    });
                };

                var attachEditProductFromBase = function attachEditProductFromBase(selector) {
                    $(selector).on('click', '#edit-product-button', function (ev) {
                        var productId = $(ev.target).attr('data-id'),
                            name = $('#item-name').val(),
                            category = $('#category').val(),
                            price = $('#price').val(),
                            product = {
                                name: name,
                                category: category,
                                price: price
                            };

                        self.getDataRepo().products.editProduct(productId, product)
                            .then(
                            function editionSuccess() {
                                note.successMessage('The product was successfully edited.');
                                window.location = '#/products';
                            },
                            function editionError(err) {
                                note.errorMessage('', 'The product couldn\'t be edited.');
                                console.log(err.responseText);
                            }
                        );
                    });
                };


                return ProductController;
            }());

        return ProductController;
    });